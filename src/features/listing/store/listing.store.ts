import { inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
  QueryConstraint,
} from '@angular/fire/firestore';
import {
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore';
import { IListingItem } from '../components/listing-item/listing-item.model';
import { EGridMode, ESortingOptions } from '../components/sort-options/sort-options.model';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export const listingConverter: FirestoreDataConverter<IListingItem> = {
  toFirestore(item: WithFieldValue<IListingItem>): DocumentData {
    return {
      ...item,
      createdAt: item.createdAt ?? serverTimestamp(),
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions
  ): IListingItem {
    const data = snapshot.data(options);
    const ts = data['createdAt'] as Timestamp;

    return {
      id: snapshot.id,
      title: data['title'],
      description: data['description'],
      createdAt: ts.toMillis(),
      promoted: data['promoted'],
      price: data['price'],
      images: data['images'],
      city: data['city'],
      date: data['date'],
      url: data['url'],
      type: data['type'],
      category: data['category'],
      subCategory: data['subCategory'],
    };
  },
};

export interface ListingState {
  searchTerm: string;
  city: string;
  listingType: 'ads' | 'services' | null;
  category: string | null;
  subCategory: string | null;

  featured: IListingItem[];
  latest: IListingItem[];

  searchResults: IListingItem[];
  isSearching: boolean;

  gridMode: EGridMode;
  sorting: ESortingOptions;

  priceFrom: number | null;
  priceTo: number | null;
  pendingPriceFrom: number | null;
  pendingPriceTo: number | null;
}

export const ListingStore = signalStore(
  { providedIn: 'root' },

  withState<ListingState>({
    searchTerm: '',
    city: '',
    listingType: null,
    category: null,
    subCategory: null,
    featured: [],
    latest: [],
    searchResults: [],
    isSearching: false,
    gridMode: EGridMode.LIST,
    sorting: ESortingOptions.NEWEST,
    priceFrom: null,
    priceTo: null,
    pendingPriceFrom: null,
    pendingPriceTo: null,
  }),

  withMethods(store => {
    const firestore = inject(Firestore);

    function setSearchTerm(searchTerm: string) {
      patchState(store, { searchTerm });
    }

    function setCity(city: string) {
      patchState(store, { city });
    }

    function setListingType(listingType: 'ads' | 'services' | null) {
      patchState(store, { listingType, category: null, subCategory: null });
    }

    function setCategory(category: string | null) {
      patchState(store, { category, subCategory: null });
    }

    function setSubCategory(subCategory: string | null) {
      patchState(store, { subCategory });
    }

    function resetFilters() {
      patchState(store, {
        searchTerm: '',
        city: '',
        listingType: null,
        category: null,
        subCategory: null,
      });
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

    function searchListings(): void {
      patchState(store, { isSearching: true });

      const searchTerm = store.searchTerm();
      const city = store.city();
      const listingType = store.listingType();
      const category = store.category();
      const subCategory = store.subCategory();
      const sorting = store.sorting();
      const priceFrom = store.priceFrom();
      const priceTo = store.priceTo();

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

      collectionData(query(coll, ...constraints), { idField: 'id' }).subscribe({
        next: (results: IListingItem[]) => {
          patchState(store, {
            searchResults: results,
            isSearching: false,
          });
        },
        error: err => {
          console.log(err);
          patchState(store, { isSearching: false });
        },
      });
    }

    return {
      setSearchTerm,
      setCity,
      setListingType,
      setCategory,
      setSubCategory,
      resetFilters,

      loadFeatured,
      loadLatest,

      setGridMode,
      setSorting,

      setPriceFrom,
      setPriceTo,

      searchListings,
    };
  })
);
