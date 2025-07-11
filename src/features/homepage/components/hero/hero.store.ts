import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { CATEGORIES } from './hero.data';
import { ICategory } from '../../../core/model/hero.model';

interface IHeroState {
  categories: ICategory[];
}

const initialState: IHeroState = {
  categories: CATEGORIES,
};

export const HeroStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(store => ({
    reset() {
      const cleared = store.categories().map(cat => ({ ...cat, active: null }));
      patchState(store, { categories: cleared });
    },

    toggleCategory(index: number) {
      const cats = store.categories();

      if (cats[index]?.active === true) {
        this.reset();
        return;
      }

      const updated = cats.map((cat, i) => ({
        ...cat,
        active: i === index ? true : false,
      }));

      patchState(store, { categories: updated });
    },
  }))
);

export type HeroStoreInstance = InstanceType<typeof HeroStore>;
