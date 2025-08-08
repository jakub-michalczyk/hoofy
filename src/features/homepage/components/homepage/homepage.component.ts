import { Component, computed, inject } from '@angular/core';
import { ListingsStore } from '../store/listings.store';
import { FeaturedListingsComponent } from '../featured-listings/featured-listings.component';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { HeroComponent } from '../hero/hero.component';

@Component({
  selector: 'hoof-homepage',
  imports: [HeroComponent, CarouselComponent, FeaturedListingsComponent],
  templateUrl: './homepage.component.html',
})
export class HomepageComponent {
  store = inject(ListingsStore);
  featured = computed(() => this.store.featured());
  latest = computed(() => this.store.latest());

  constructor() {
    this.store.refetchFeatured();
    this.store.refetchLatest();
  }
}
