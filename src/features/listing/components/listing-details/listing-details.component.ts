import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IListingItem } from '../listing-item/listing-item.model';
import { Observable, switchMap } from 'rxjs';
import { ListingStore } from '../../store/listing.store';
import { AsyncPipe, CommonModule } from '@angular/common';
import { IonButton, IonIcon, ToastController } from '@ionic/angular/standalone';
import { AddToFavouritesComponent } from '../../../shared/components/add-to-favourites/add-to-favourites.component';
import { ListingDetailsTagsComponent } from '../listing-details-tags/listing-details-tags.component';

@Component({
  selector: 'hoof-listing-details',
  imports: [
    AsyncPipe,
    CommonModule,
    IonIcon,
    AddToFavouritesComponent,
    ListingDetailsTagsComponent,
    IonButton,
  ],
  templateUrl: './listing-details.component.html',
})
export class ListingDetailsComponent {
  private route = inject(ActivatedRoute);
  private listingStore = inject(ListingStore);
  private toastController = inject(ToastController);

  listing$: Observable<IListingItem | null> = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id');
      return id ? this.listingStore.getListingById(id) : [null];
    })
  );

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
