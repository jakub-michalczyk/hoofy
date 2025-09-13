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
  DocumentSnapshot,
  startAfter,
  getDocs,
  getCountFromServer,
  doc,
  getDoc,
} from 'firebase/firestore';

import { EGridMode, ESortingOptions } from '../components/sort-options/sort-options.model';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { from, map, Observable } from 'rxjs';
import { IListingItem, ITag } from '../components/listing-item/listing-item.model';
import {
  EHorseBreed,
  EHorseCoat,
  EHorseGender,
  ICareFilter,
  IEquipmentFilter,
  IHorseDetails,
  ISpecialistFilter,
  IStableFilter,
  ITrainingFilter,
} from '../model/filters.model';

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

    const rawCreatedAt = data['createdAt'];
    const createdAt =
      rawCreatedAt instanceof Timestamp
        ? rawCreatedAt.toMillis()
        : typeof rawCreatedAt === 'number'
          ? rawCreatedAt
          : Number(rawCreatedAt);

    return {
      id: snapshot.id,
      title: data['title'],
      description: data['description'],
      createdAt,
      promoted: data['promoted'],
      price: data['price'],
      images: data['images'],
      city: data['city'],
      date: data['date'],
      type: data['type'],
      category: data['category'],
      subCategory: data['subCategory'],
      userName: data['userName'],
      details: data['details'],
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

  currentPage: number;
  pageSize: number;
  pageCursors: DocumentSnapshot[];
  totalCount: number;

  horseFilters: IHorseDetails;
  equipmentFilters: IEquipmentFilter;
  careFilters: ICareFilter;
  stableFilters: IStableFilter;
  specialistFilters: ISpecialistFilter;
  trainingFilters: ITrainingFilter;
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
    currentPage: 1,
    pageSize: 10,
    pageCursors: [],
    totalCount: 0,
    horseFilters: {
      age: 40,
      gender: EHorseGender.ANY,
      breed: EHorseBreed.ANY,
      coat: EHorseCoat.ANY,
      height: 220,
    },
    equipmentFilters: { type: '', condition: 'new', brand: '', material: '', color: '' },
    careFilters: {
      productType: '',
      brand: '',
      forAgeGroup: undefined,
      forCondition: undefined,
      organic: undefined,
    },
    stableFilters: {
      location: '',
      boxType: '',
      services: [],
      maxCapacity: undefined,
      indoorArena: undefined,
      outdoorArena: undefined,
    },
    specialistFilters: {
      specialization: '',
      location: '',
      mobileService: undefined,
      experienceYears: undefined,
      certifications: undefined,
      availableDays: undefined,
    },
    trainingFilters: {
      discipline: '',
      trainerLevel: '',
      location: '',
      forLevel: '',
      groupSize: undefined,
      indoor: undefined,
    },
  }),

  withMethods(store => {
    const firestore = inject(Firestore);

    function setHorseFilters(filters: IHorseDetails) {
      patchState(store, { horseFilters: filters });
    }

    function updateHorseFilter<K extends keyof IHorseDetails>(key: K, value: IHorseDetails[K]) {
      patchState(store, {
        horseFilters: {
          ...store.horseFilters(),
          [key]: value,
        },
      });
    }

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

    function setPage(page: number) {
      const totalPages = Math.ceil(store.totalCount() / store.pageSize());
      const next = Math.min(Math.max(page, 1), totalPages);
      patchState(store, { currentPage: next });
      searchListings();
    }

    function getListingById(id: string): Observable<IListingItem | null> {
      const ref = doc(firestore, 'listings', id).withConverter(listingConverter);
      return from(getDoc(ref)).pipe(map(snap => (snap.exists() ? snap.data() : null)));
    }

    function setTotalCount(n: number) {
      patchState(store, { totalCount: n });
    }

    function buildHorseTags(h: IHorseDetails): ITag[] {
      return [
        { icon: 'age', label: 'Wiek', value: h.age, unit: 'lat' },
        { icon: 'gender', label: 'Płeć', value: h.gender },
        { icon: 'breed', label: 'Rasa', value: h.breed },
        { icon: 'color', label: 'Maść', value: h.coat },
        { icon: 'height', label: 'Wzrost w kłębie', value: h.height, unit: 'cm' },
      ];
    }

    function buildEquipmentTags(e: IEquipmentFilter): ITag[] {
      return [
        { icon: 'construct', label: 'Typ', value: e.type },
        { icon: 'clipboard', label: 'Stan', value: e.condition },
        { icon: 'pricetag', label: 'Marka', value: e.brand },
        { icon: 'color-fill', label: 'Materiał', value: e.material },
        { icon: 'color-palette', label: 'Kolor', value: e.color },
      ];
    }

    function buildCareTags(c: ICareFilter): ITag[] {
      const base: ITag[] = [
        { icon: 'medkit', label: 'Typ produktu', value: c.productType },
        { icon: 'pricetag', label: 'Marka', value: c.brand },
      ];
      if (c.forAgeGroup) {
        base.push({ icon: 'people', label: 'Wiek użytkownika', value: c.forAgeGroup });
      }
      if (c.forCondition) {
        base.push({ icon: 'heart', label: 'Stan', value: c.forCondition });
      }
      if (c.organic !== undefined) {
        base.push({ icon: 'leaf', label: 'Organiczne', value: c.organic ? 'tak' : 'nie' });
      }
      return base;
    }

    function buildStableTags(s: IStableFilter): ITag[] {
      const base: ITag[] = [
        { icon: 'location', label: 'Lokalizacja', value: s.location },
        { icon: 'cube', label: 'Rodzaj boksu', value: s.boxType },
        { icon: 'people', label: 'Usługi', value: s.services.join(', ') },
      ];
      if (s.maxCapacity !== undefined) {
        base.push({ icon: 'people', label: 'Max pojemność', value: s.maxCapacity });
      }
      if (s.indoorArena) {
        base.push({ icon: 'home', label: 'Arena wewnętrzna', value: 'tak' });
      }
      if (s.outdoorArena) {
        base.push({ icon: 'sunny', label: 'Arena zewnętrzna', value: 'tak' });
      }
      return base;
    }

    function buildSpecialistTags(sp: ISpecialistFilter): ITag[] {
      const base: ITag[] = [
        { icon: 'medical', label: 'Specjalizacja', value: sp.specialization },
        { icon: 'location', label: 'Lokalizacja', value: sp.location },
        { icon: 'calendar', label: 'Mobilny serwis', value: sp.mobileService ? 'tak' : 'nie' },
      ];
      if (sp.experienceYears !== undefined) {
        base.push({ icon: 'trophy', label: 'Doświadczenie', value: sp.experienceYears });
      }
      if (sp.certifications?.length) {
        base.push({ icon: 'ribbon', label: 'Certyfikaty', value: sp.certifications.join(', ') });
      }
      if (sp.availableDays?.length) {
        base.push({
          icon: 'calendar-number',
          label: 'Dostępne dni',
          value: sp.availableDays.join(', '),
        });
      }
      return base;
    }

    function buildTrainingTags(t: ITrainingFilter): ITag[] {
      const base: ITag[] = [
        { icon: 'sport', label: 'Dyscyplina', value: t.discipline },
        { icon: 'star', label: 'Poziom trenera', value: t.trainerLevel },
        { icon: 'location', label: 'Lokalizacja', value: t.location },
        { icon: 'school', label: 'Dla poziomu', value: t.forLevel },
      ];
      if (t.groupSize !== undefined) {
        base.push({ icon: 'people', label: 'Wielkość grupy', value: t.groupSize });
      }
      if (t.indoor !== undefined) {
        base.push({ icon: 'home', label: 'Sala wewnętrzna', value: t.indoor ? 'tak' : 'nie' });
      }
      return base;
    }

    async function searchListings(): Promise<Promise<void>> {
      patchState(store, { isSearching: true });

      const searchTerm = store.searchTerm();
      const city = store.city();
      const listingType = store.listingType();
      const category = store.category();
      const subCategory = store.subCategory();
      const sorting = store.sorting();
      const priceFrom = store.priceFrom();
      const priceTo = store.priceTo();
      const currentPage = store.currentPage();
      const pageCursors = store.pageCursors();
      const pageSize = store.pageSize();
      const horseFilters = store.horseFilters();

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

      setPage,
      setTotalCount,

      getListingById,

      setHorseFilters,
      updateHorseFilter,

      buildHorseTags,
      buildEquipmentTags,
      buildCareTags,
      buildSpecialistTags,
      buildStableTags,
      buildTrainingTags,
    };
  })
);
