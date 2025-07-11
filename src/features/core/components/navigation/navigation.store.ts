import { signalStore, withState, patchState, withMethods } from '@ngrx/signals';
import { INavigationMenuElement } from '../../model/navigation.model';
import { MENU } from './navigation.data';

interface INavigationState {
  links: INavigationMenuElement[];
  submenuElement: INavigationMenuElement | null;
  sideMenuOpened: boolean;
}

const initialState: INavigationState = {
  links: MENU,
  submenuElement: null,
  sideMenuOpened: false,
};

export const NavigationStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(store => ({
    build(index: number) {
      const candidate = store.links()[index];
      patchState(store, {
        submenuElement: candidate?.submenu ? candidate : null,
      });
    },

    reset() {
      patchState(store, { submenuElement: null });
    },

    toggleSideMenu() {
      patchState(store, { sideMenuOpened: !store.sideMenuOpened() });
    },

    closeSideMenu() {
      patchState(store, { sideMenuOpened: false });
    },
  }))
);

export type NavigationStoreInstance = InstanceType<typeof NavigationStore>;
