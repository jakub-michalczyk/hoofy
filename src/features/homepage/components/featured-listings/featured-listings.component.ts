import { Component, Input, Signal, signal } from '@angular/core';
import { ListingItemComponent } from '../../../listing/components/listing-item/listing-item.component';
import {
  EListingItemType,
  IListingItem,
} from '../../../listing/components/listing-item/listing-item.model';

@Component({
  selector: 'hoof-featured-listings',
  imports: [ListingItemComponent],
  templateUrl: './featured-listings.component.html',
})
export class FeaturedListingsComponent {
  @Input() title = '';
  @Input() listings: Signal<IListingItem[]> = signal([]);

  EListingItemType = EListingItemType;
}
