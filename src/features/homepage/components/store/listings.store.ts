import { inject } from '@angular/core';
import { Firestore, collection, query, where, orderBy, limit } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { tap } from 'rxjs';
import { IListingItem } from '../../../listing/components/listing-item/listing-item.model';

interface ListingsState {
  featured: IListingItem[];
  latest: IListingItem[];
}

export const ListingsStore = signalStore(
  { providedIn: 'root' },

  withState<ListingsState>({
    featured: [],
    latest: [],
  }),

  withMethods(store => {
    const firestore = inject(Firestore);

    function loadFeatured() {
      const q = query(collection(firestore, 'listings'), where('promoted', '==', true), limit(30));
      collectionData(q, { idField: 'id' })
        .pipe(tap(data => patchState(store, { featured: data as IListingItem[] })))
        .subscribe();
    }

    function loadLatest() {
      const q = query(collection(firestore, 'listings'), orderBy('createdAt', 'desc'), limit(10));
      collectionData(q, { idField: 'id' })
        .pipe(tap(data => patchState(store, { latest: data as IListingItem[] })))
        .subscribe();
    }

    return {
      refetchFeatured: loadFeatured,
      refetchLatest: loadLatest,
    };
  })
);
