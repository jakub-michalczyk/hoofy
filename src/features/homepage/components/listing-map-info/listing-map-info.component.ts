import { Component, Input } from '@angular/core';
import { IListingItem } from '../../../listing/components/listing-item/listing-item.model';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'hoof-listing-map-info',
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonItem,
    CurrencyPipe,
    IonLabel,
    IonList,
    IonIcon,
    IonButtons,
    IonTitle,
    IonToolbar,
    RouterLink,
    IonItemOption,
  ],
  templateUrl: './listing-map-info.component.html',
})
export class ListingMapInfoComponent {
  @Input() listing!: IListingItem;

  get googleMapsUrl(): string {
    const { lat, lng } = this.listing;
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }
}
