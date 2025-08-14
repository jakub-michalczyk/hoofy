import { inject } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  collectionData,
  QueryConstraint,
  serverTimestamp,
  Timestamp,
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from '@angular/fire/firestore';

import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

import { toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, switchMap, Observable, tap } from 'rxjs';
import { IListingItem } from '../components/listing-item/listing-item.model';

/**
 * Konwerter pomiędzy Firestore a IListingItem
 */
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
      image: data['image'],
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
  // filtry wyszukiwania
  searchTerm: string;
  city: string;
  listingType: 'ads' | 'services' | null;
  category: string | null;
  subCategory: string | null;

  // statyczne listy
  featured: IListingItem[];
  latest: IListingItem[];
}

export const ListingStore = signalStore(
  { providedIn: 'root' },

  // początkowy stan
  withState<ListingState>({
    searchTerm: '',
    city: '',
    listingType: null,
    category: null,
    subCategory: null,
    featured: [],
    latest: [],
  }),

  // metody do zmiany stanu i fetchowania
  withMethods(store => {
    const firestore = inject(Firestore);

    // --- Aktualizacja filtrów ---
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

    // --- Ładowanie featured i latest ---
    function loadFeatured() {
      const coll = collection(firestore, 'listings').withConverter(listingConverter);
      const q = query(coll, where('promoted', '==', true), limit(30));

      collectionData(q)
        .pipe(tap(featured => patchState(store, { featured })))
        .subscribe();
    }

    function loadLatest() {
      const coll = collection(firestore, 'listings').withConverter(listingConverter);
      const q = query(coll, orderBy('createdAt', 'desc'), limit(10));

      collectionData(q)
        .pipe(tap(latest => patchState(store, { latest })))
        .subscribe();
    }

    // --- Dynamiczny strumień wyników ---
    function getSearchResults(): Observable<IListingItem[]> {
      const search$ = toObservable(store.searchTerm);
      const city$ = toObservable(store.city);
      const type$ = toObservable(store.listingType);
      const cat$ = toObservable(store.category);
      const sub$ = toObservable(store.subCategory);

      return combineLatest([search$, city$, type$, cat$, sub$]).pipe(
        switchMap(([search, city, type, cat, sub]) => {
          const coll = collection(firestore, 'listings').withConverter(listingConverter);
          const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];

          if (type) {
            constraints.push(where('type', '==', type));
          }
          if (search) {
            constraints.push(where('title', '>=', search), where('title', '<=', search + '\uf8ff'));
          }
          if (city) {
            constraints.push(where('city', '==', city));
          }
          if (sub) {
            constraints.push(where('subCategory', '==', sub));
          } else if (cat) {
            constraints.push(where('category', '==', cat));
          }

          return collectionData(query(coll, ...constraints), { idField: 'id' }) as Observable<
            IListingItem[]
          >;
        })
      );
    }

    return {
      // filtry
      setSearchTerm,
      setCity,
      setListingType,
      setCategory,
      setSubCategory,
      resetFilters,

      // fetch statycznych list
      loadFeatured,
      loadLatest,

      // dynamiczny strumień
      getSearchResults,
    };
  })
);
