import { Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IListingItem } from '../listing-item/listing-item.model';
import { combineLatest, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { ListingStore } from '../../store/listing.store';
import { AsyncPipe, CommonModule } from '@angular/common';
import { IonButton, IonIcon, ToastController } from '@ionic/angular/standalone';
import { AddToFavouritesComponent } from '../../../shared/components/add-to-favourites/add-to-favourites.component';
import { ListingDetailsTagsComponent } from '../listing-details-tags/listing-details-tags.component';
import { MapComponent } from '../../../map/components/map/map.component';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { UserStore } from '../../store/user.store';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ECategoryName } from '../../../core/model/category.model';
import { FeaturedListingsComponent } from '../../../homepage/components/featured-listings/featured-listings.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { IUserData } from '../../../auth/models/auth.model';

@Component({
  selector: 'hoof-listing-details',
  imports: [
    AsyncPipe,
    CommonModule,
    IonIcon,
    AddToFavouritesComponent,
    ListingDetailsTagsComponent,
    IonButton,
    MapComponent,
    CarouselComponent,
    FeaturedListingsComponent,
    GalleryComponent,
  ],
  templateUrl: './listing-details.component.html',
})
export class ListingDetailsComponent {
  private route = inject(ActivatedRoute);
  protected listingStore = inject(ListingStore);
  private toastController = inject(ToastController);
  private destroyerRef = inject(DestroyRef);
  userListings: WritableSignal<IListingItem[]> = signal([]);

  userStore = inject(UserStore);
  user$: Observable<IUserData | null> = of({} as IUserData);
  listing$: Observable<IListingItem | null> = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id');
      return id ? this.listingStore.getListingById(id) : of(null);
    }),
    tap(listing => {
      if (listing?.userId) {
        this.user$ = from(this.userStore.fetchUserProfile(listing.userId));
      }
    })
  );

  constructor() {
    this.fetchSimilarListings();
    this.fetchProfileUser();
  }

  private fetchSimilarListings() {
    this.listing$
      .pipe(takeUntilDestroyed(this.destroyerRef))
      .subscribe(listing => this.listingStore.loadSimilar(listing?.category as ECategoryName));
  }

  private fetchProfileUser() {
    this.listing$
      .pipe(
        switchMap(listing => {
          if (!listing?.userId) {
            this.userListings.set([]);
            return of<IListingItem[]>([]);
          }

          return from(this.userStore.fetchUserProfile(listing.userId)).pipe(
            switchMap(userData => {
              const ids = userData?.listings.filter(i => i !== listing.id) ?? [];
              if (!ids.length) {
                return of<IListingItem[]>([]);
              }

              const obsArray = ids.map(id => this.listingStore.getListingById(id));

              return combineLatest(obsArray).pipe(
                map(items => items.filter((it): it is IListingItem => it !== null))
              );
            })
          );
        }),
        takeUntilDestroyed(this.destroyerRef)
      )
      .subscribe(items => {
        this.userListings.set(items);
      });
  }

  async share(): Promise<void> {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      this.showToast('Link został skopiowany do schowka!');
    } catch (err) {
      this.showToast('Ups! Nie udało się skopiować linku.');
      console.error('Clipboard error:', err);
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      cssClass: 'text-center body-4',
    });
    await toast.present();
  }
}
