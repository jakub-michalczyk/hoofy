import { inject, Injectable } from '@angular/core';
import {
  NavigationStore,
  NavigationStoreInstance,
} from '../components/navigation/navigation.store';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly store: NavigationStoreInstance = inject(NavigationStore);

  readonly links = this.store.links;
  readonly submenuElement = this.store.submenuElement;
  readonly sideMenuOpened = this.store.sideMenuOpened;

  build(index: number) {
    this.store.build(index);
  }

  reset() {
    this.store.reset();
  }

  toggleSideMenu() {
    this.store.toggleSideMenu();
  }

  closeSideMenu() {
    this.store.closeSideMenu();
  }
}
