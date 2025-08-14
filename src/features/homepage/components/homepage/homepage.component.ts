import { Component, inject } from '@angular/core';
import { FeaturedListingsComponent } from '../featured-listings/featured-listings.component';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { HeroComponent } from '../hero/hero.component';
import { ListingStore } from '../../../listing/store/listing.store';

@Component({
  selector: 'hoof-homepage',
  imports: [HeroComponent, CarouselComponent, FeaturedListingsComponent],
  templateUrl: './homepage.component.html',
})
export class HomepageComponent {
  store = inject(ListingStore);
  featured = this.store.featured;
  latest = this.store.latest;

  constructor() {
    this.store.loadFeatured();
    this.store.loadLatest();
  }
}
