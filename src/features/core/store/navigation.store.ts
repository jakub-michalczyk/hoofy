import { signalStore, withState, patchState, withMethods } from '@ngrx/signals';
import {
  INavigationMenuElement,
  INavigationSubmenuColumn,
  INavigationSubmenuItem,
} from '../model/navigation.model';
import { MENU } from '../components/navigation/navigation.data';

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

    getMainCategories(): INavigationSubmenuColumn[] {
      const listingSections = store.links().filter(link => link.slug === 'listing');
      return listingSections.flatMap(section => section.submenu ?? []);
    },

    getSubcategories(mainSlug: string): INavigationSubmenuItem[] {
      const listingSections = store.links().filter(link => link.slug === mainSlug);
      return listingSections.flatMap(section => section.submenu?.flatMap(col => col.items) ?? []);
    },

    getMainCategoryBySlug(slug: string): INavigationMenuElement | undefined {
      return store.links().find(link => link.slug === slug);
    },

    getSubcategoryBySlug(mainSlug: string, subSlug: string) {
      const subColumn = store
        .links()
        .flatMap(link => link.submenu ?? [])
        .find(sub => sub.slug === mainSlug);
      return subColumn?.items.find(item => item.slug === subSlug);
    },
  }))
);

export type NavigationStoreInstance = InstanceType<typeof NavigationStore>;
