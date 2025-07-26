import { Component, computed, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  chevronDown,
  chevronUp,
  locationOutline,
  searchOutline,
  arrowBackOutline,
  arrowForwardOutline,
  heartOutline,
  heart,
  cashOutline,
  logoFacebook,
  logoInstagram,
  logoLinkedin,
  logoTiktok,
  logoYoutube,
  mailOutline,
} from 'ionicons/icons';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HeroComponent } from '../features/homepage/components/hero/hero.component';
import { IonContent } from '@ionic/angular/standalone';
import { OffCanvasComponent } from '../features/core/components/off-canvas/off-canvas.component';
import { TopBarComponent } from '../features/core/components/top-bar/top-bar.component';
import { NavigationService } from '../features/core/services/navigation.service';
import { CarouselComponent } from '../features/shared/components/carousel/carousel.component';
import { FeaturedListingsComponent } from '../features/homepage/components/featured-listings/featured-listings.component';
import { FooterComponent } from '../features/core/components/footer/footer.component';
import { ListingsStore } from '../features/homepage/components/store/listings.store';

@Component({
  selector: 'hoof-root',
  imports: [
    TopBarComponent,
    OffCanvasComponent,
    CommonModule,
    HeroComponent,
    IonContent,
    CarouselComponent,
    FeaturedListingsComponent,
    FooterComponent,
  ],
  templateUrl: './hoof.component.html',
})
export class AppComponent {
  navigation = inject(NavigationService);
  breakpointObserver = inject(BreakpointObserver);
  store = inject(ListingsStore);
  featured = computed(() => this.store.featured());
  latest = computed(() => this.store.latest());

  private destroyerRef = inject(DestroyRef);

  constructor() {
    this.registerIcons();
    this.initResizeObserver();

    this.store.refetchFeatured();
    this.store.refetchLatest();
  }

  registerIcons() {
    addIcons({
      'chevron-down-outline': chevronDown,
      'chevron-up-outline': chevronUp,
      'location-outline': locationOutline,
      'search-outline': searchOutline,
      'arrow-back-outline': arrowBackOutline,
      'arrow-forward-outline': arrowForwardOutline,
      'heart-outline': heartOutline,
      heart: heart,
      'cash-outline': cashOutline,
      'logo-facebook': logoFacebook,
      'logo-instagram': logoInstagram,
      'logo-linkedin': logoLinkedin,
      'logo-tiktok': logoTiktok,
      'logo-youtube': logoYoutube,
      'mail-outline': mailOutline,
    });
  }

  initResizeObserver() {
    this.breakpointObserver
      .observe(['(min-width: 1024px)'])
      .pipe(takeUntilDestroyed(this.destroyerRef))
      .subscribe(({ matches }) => {
        if (matches) {
          this.navigation.closeSideMenu();
        }
      });
  }
}
