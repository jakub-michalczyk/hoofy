import { Component, Input } from '@angular/core';
import { IListingItem } from '../../../listing/components/listing-item/listing-item.model';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'hoof-listing-map-info',
  imports: [IonButton, IonContent, IonItem, IonLabel, IonList, IonIcon, RouterLink],
  templateUrl: './listing-map-info.component.html',
})
export class ListingMapInfoComponent {
  @Input() listing!: IListingItem;

  get googleMapsUrl(): string {
    const { lat, lng } = this.listing;
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }
}
