import { Component, inject } from '@angular/core';
import { FeaturedListingsComponent } from '../featured-listings/featured-listings.component';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { HeroComponent } from '../hero/hero.component';
import { ListingStore } from '../../../listing/store/listing.store';

import { IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

import { NavigationStore } from '../../../core/store/navigation.store';
import {
  INavigationMenuElement,
  INavigationSubmenuItem,
} from '../../../core/model/navigation.model';
import { MapComponent } from '../../../map/components/map/map.component';

@Component({
  selector: 'hoof-homepage',
  imports: [
    HeroComponent,
    CarouselComponent,
    FeaturedListingsComponent,
    IonButton,
    RouterLink,
    MapComponent,
  ],
  templateUrl: './homepage.component.html',
})
export class HomepageComponent {
  private store = inject(ListingStore);

  protected navigation = inject(NavigationStore);
  protected subCategoriesLinks: INavigationSubmenuItem[] = [];

  protected featured = this.store.featured;
  protected latest = this.store.latest;

  constructor() {
    this.store.loadFeatured();
    this.store.loadLatest();
    this.setUpSubcategoriesLinks();
  }

  setUpSubcategoriesLinks() {
    this.subCategoriesLinks = this.navigation
      .links()
      .flatMap((link: INavigationMenuElement) => link.submenu?.flatMap(sub => sub.items) || []);
  }
}
