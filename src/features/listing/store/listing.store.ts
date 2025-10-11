import { inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
  orderBy,
  limit,
  QueryConstraint,
} from '@angular/fire/firestore';
import {
  startAfter,
  getDocs,
  getCountFromServer,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  setDoc,
} from 'firebase/firestore';

import { EGridMode, ESortingOptions } from '../components/sort-options/sort-options.model';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { from, map, Observable } from 'rxjs';
import { IListingItem } from '../components/listing-item/listing-item.model';
import { EHorseBreed, EHorseCoat, EHorseGender } from '../model/filters.model';
import { IListingState } from '../model/listing.model';
import { listingConverter } from '../utils/listing-converter';
import { FiltersStore } from './filters.store';
import { ECategoryName } from '../../core/model/category.model';

export const LISTING_STATE: IListingState = {
  searchTerm: '',
  location: '',
  listingType: null,
  category: null,
  subCategory: null,
  featured: [],
  latest: [],
  similar: [],
  searchResults: [],
  isSearching: false,
  gridMode: EGridMode.LIST,
  sorting: ESortingOptions.NEWEST,
  priceFrom: null,
  priceTo: null,
  pendingPriceFrom: null,
  pendingPriceTo: null,
  currentPage: 1,
  pageSize: 10,
  pageCursors: [],
  totalCount: 0,
  visible: [],
  listingCords: {
    lat: null,
    lng: null,
  },
};

export const ListingStore = signalStore(
  { providedIn: 'root' },
  withState<IListingState>(LISTING_STATE),
  withMethods(store => {
    const firestore = inject(Firestore);
    const filtersStore = inject(FiltersStore);

    function setSearchTerm(searchTerm: string) {
      patchState(store, { searchTerm });
    }

    function setCity(location: string) {
      patchState(store, { location });
    }

    function setCategory(category: string | null) {
      patchState(store, { category, subCategory: null });
    }

    function addListingCords(lat: number, lng: number) {
      patchState(store, { listingCords: { lat: lat, lng: lng } });
    }

    function setSubCategory(subCategory: string | null) {
      patchState(store, { subCategory });
    }

    function loadFeatured() {
      const coll = collection(firestore, 'listings').withConverter(listingConverter);
      const q = query(coll, where('promoted', '==', true), limit(30));

      collectionData(q, { idField: 'id' })
        .pipe()
        .subscribe(featured => patchState(store, { featured }));
    }

    function loadLatest() {
      const coll = collection(firestore, 'listings').withConverter(listingConverter);
      const q = query(coll, orderBy('createdAt', 'desc'), limit(10));

      collectionData(q, { idField: 'id' })
        .pipe()
        .subscribe(latest => patchState(store, { latest }));
    }

    function loadSimilar(category: ECategoryName) {
      const coll = collection(firestore, 'listings').withConverter(listingConverter);
      const q = query(coll, where('category', '==', category), limit(20));

      collectionData(q, { idField: 'id' })
        .pipe()
        .subscribe(similar => patchState(store, { similar }));
    }

    function setGridMode(gridMode: EGridMode) {
      patchState(store, { gridMode });
    }

    function setSorting(sorting: ESortingOptions) {
      patchState(store, { sorting });
    }

    function setPriceFrom(priceFrom: number | null) {
      patchState(store, { priceFrom });
    }

    function setPriceTo(priceTo: number | null) {
      patchState(store, { priceTo });
    }

    async function patchListingImages(listingId: string, urls: string[]): Promise<void> {
      const ref = doc(firestore, 'listings', listingId);
      await updateDoc(ref, { images: urls });
    }

    function setPage(page: number) {
      const totalPages = Math.max(1, Math.ceil(store.totalCount() / store.pageSize()));
      const next = Math.min(Math.max(page, 1), totalPages);
      patchState(store, { currentPage: next });
    }

    function getListingById(id: string): Observable<IListingItem | null> {
      const ref = doc(firestore, 'listings', id).withConverter(listingConverter);
      return from(getDoc(ref)).pipe(map(snap => (snap.exists() ? snap.data() : null)));
    }

    function setTotalCount(n: number) {
      patchState(store, { totalCount: n });
    }

    async function addListing(listing: IListingItem) {
      const collRef = collection(firestore, 'listings').withConverter(listingConverter);

      const payload = {
        ...listing,
        createdAt: Date.now(),
      } as IListingItem;

      const docRef = await addDoc(collRef, payload);

      const savedSnap = await getDoc(docRef.withConverter(listingConverter));

      if (!savedSnap.exists()) {
        throw new Error('Failed to create listing');
      }

      const savedRaw = savedSnap.data() as unknown as Record<string, unknown>;

      const result = {
        ...(savedRaw as Record<string, unknown>),
        id: docRef.id,
      } as unknown as IListingItem;

      const currentResults =
        typeof store.searchResults === 'function' ? store.searchResults() : undefined;
      if (Array.isArray(currentResults)) {
        patchState(store, { searchResults: [result, ...currentResults] });
      }

      return result;
    }

    async function updateListing(listingId: string, listing: IListingItem) {
      const docRef = doc(firestore, 'listings', listingId).withConverter(listingConverter);
      await setDoc(docRef, listing, { merge: false });

      const savedSnap = await getDoc(docRef.withConverter(listingConverter));
      if (!savedSnap.exists()) throw new Error('Failed to update listing');

      const savedRaw = savedSnap.data() as unknown as Record<string, unknown>;
      const result = { ...(savedRaw as Record<string, unknown>), id: listingId } as IListingItem;

      const currentResults =
        typeof store.searchResults === 'function' ? store.searchResults() : undefined;
      if (Array.isArray(currentResults)) {
        const updated = currentResults.map(r => (r.id === listingId ? result : r));
        patchState(store, { searchResults: updated });
      }

      return result;
    }

    async function loadInViewport(
      bounds: {
        latMin: number;
        lngMin: number;
        latMax: number;
        lngMax: number;
      },
      listingId?: string
    ): Promise<IListingItem[]> {
      if (listingId) {
        const docRef = doc(firestore, 'listings', listingId).withConverter(listingConverter);

        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const item = docSnap.data();
          patchState(store, { visible: [item] });
          return [item];
        } else {
          patchState(store, { visible: [] });
          return [];
        }
      }

      const category = store.category();
      const subCategory = store.subCategory();
      const priceFrom = store.priceFrom();
      const priceTo = store.priceTo();
      const horseFilters = filtersStore.horseFilters();
      const collRef = collection(firestore, 'listings').withConverter(listingConverter);
      const constraints: QueryConstraint[] = [
        where('lat', '>=', bounds.latMin),
        where('lat', '<=', bounds.latMax),
        where('lng', '>=', bounds.lngMin),
        where('lng', '<=', bounds.lngMax),
      ];

      if (category) {
        constraints.push(where('category', '==', category));
      }
      if (subCategory) {
        constraints.push(where('subCategory', '==', subCategory));
      }
      if (priceFrom != null) {
        constraints.push(where('price', '>=', priceFrom));
      }
      if (priceTo != null) {
        constraints.push(where('price', '<=', priceTo));
      }

      if (horseFilters.age != null) {
        constraints.push(where('details.age', '<=', horseFilters.age));
      }
      if (horseFilters.height != null) {
        constraints.push(where('details.height', '<=', horseFilters.height));
      }
      if (horseFilters.gender && horseFilters.gender !== EHorseGender.ANY) {
        constraints.push(where('details.gender', '==', horseFilters.gender));
      }
      if (horseFilters.breed && horseFilters.breed !== EHorseBreed.ANY) {
        constraints.push(where('details.breed', '==', horseFilters.breed));
      }
      if (horseFilters.coat && horseFilters.coat !== EHorseCoat.ANY) {
        constraints.push(where('details.coat', '==', horseFilters.coat));
      }

      const q = query(collRef, ...constraints);
      const snap = await getDocs(q);
      const items = snap.docs.map(docSnap => docSnap.data() as IListingItem);

      patchState(store, { visible: items });
      return items;
    }

    async function searchListings(): Promise<Promise<void>> {
      patchState(store, { isSearching: true });

      const searchTerm = store.searchTerm();
      const city = store.location();
      const listingType = store.listingType();
      const category = store.category();
      const subCategory = store.subCategory();
      const sorting = store.sorting();
      const priceFrom = store.priceFrom();
      const priceTo = store.priceTo();
      const currentPage = store.currentPage();
      const pageCursors = store.pageCursors();
      const pageSize = store.pageSize();
      const horseFilters = filtersStore.horseFilters();

      const coll = collection(firestore, 'listings').withConverter(listingConverter);
      const constraints: QueryConstraint[] = [];

      switch (sorting) {
        case ESortingOptions.NEWEST:
          constraints.push(orderBy('createdAt', 'desc'));
          break;
        case ESortingOptions.PRICE_HIGH_TO_LOW:
          constraints.push(orderBy('price', 'desc'));
          break;
        case ESortingOptions.PRICE_LOW_TO_HIGH:
          constraints.push(orderBy('price', 'asc'));
          break;
      }

      if (searchTerm) {
        constraints.push(
          where('title', '>=', searchTerm),
          where('title', '<=', searchTerm + '\uf8ff')
        );
      }

      if (listingType) {
        constraints.push(where('type', '==', listingType));
      }

      if (city) {
        constraints.push(where('city', '==', city));
      }

      if (category) {
        constraints.push(where('category', '==', category));
      }
      if (subCategory) {
        constraints.push(where('subCategory', '==', subCategory));
      }

      if (priceFrom != null) {
        constraints.push(where('price', '>=', priceFrom));
      }
      if (priceTo != null) {
        constraints.push(where('price', '<=', priceTo));
      }

      if (horseFilters.age !== undefined && horseFilters.age !== null) {
        constraints.push(where('details.age', '<=', horseFilters.age));
      }

      if (horseFilters.height !== undefined && horseFilters.height !== null) {
        constraints.push(where('details.height', '<=', horseFilters.height));
      }

      if (horseFilters.gender && horseFilters.gender !== EHorseGender.ANY) {
        constraints.push(where('details.gender', '==', horseFilters.gender));
      }

      if (horseFilters.breed && horseFilters.breed !== EHorseBreed.ANY) {
        constraints.push(where('details.breed', '==', horseFilters.breed));
      }

      if (horseFilters.coat && horseFilters.coat !== EHorseCoat.ANY) {
        constraints.push(where('details.coat', '==', horseFilters.coat));
      }

      const countQuery = query(coll, ...constraints);
      const countSnap = await getCountFromServer(countQuery);
      setTotalCount(countSnap.data().count);

      const pageConstraints = constraints.slice();
      if (currentPage > 1 && pageCursors[currentPage - 2]) {
        pageConstraints.push(startAfter(pageCursors[currentPage - 2]));
      }
      pageConstraints.push(limit(pageSize));

      const pageQuery = query(coll, ...pageConstraints);
      const snap = await getDocs(pageQuery);

      const items = snap.docs.map(d => d.data());
      const last = snap.docs[snap.docs.length - 1];
      const cursors = [...store.pageCursors()];
      cursors[currentPage - 1] = last;

      patchState(store, {
        searchResults: items,
        pageCursors: cursors,
        isSearching: false,
      });
    }

    return {
      setSearchTerm,
      setCity,
      setCategory,
      setSubCategory,
      updateListing,

      loadFeatured,
      loadLatest,
      loadSimilar,

      setGridMode,
      setSorting,

      setPriceFrom,
      setPriceTo,

      searchListings,

      setPage,
      setTotalCount,

      loadInViewport,

      getListingById,
      addListingCords,
      addListing,
      patchListingImages,
    };
  })
);
