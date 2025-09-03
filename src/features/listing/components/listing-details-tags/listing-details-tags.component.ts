import { Component, Input } from '@angular/core';
import { IListingItem } from '../listing-item/listing-item.model';
import { KeyValuePipe } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'hoof-listing-details-tags',
  imports: [KeyValuePipe, IonIcon],
  templateUrl: './listing-details-tags.component.html',
})
export class ListingDetailsTagsComponent {
  @Input() data: IListingItem = {} as IListingItem;
  detailLabels: Record<string, string> = {
    age: 'Wiek',
    gender: 'Płeć',
    breed: 'Rasa',
    color: 'Maść',
    height: 'Wzrost w kłębie',
  };
  detailUnits: Record<string, string> = {
    age: 'lat',
    height: 'cm',
  };
}
