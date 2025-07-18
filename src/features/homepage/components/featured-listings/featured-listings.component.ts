import { Component, Input } from '@angular/core';
import { ListingItemComponent } from '../../../shared/components/listing-item/listing-item.component';

@Component({
  selector: 'hoof-featured-listings',
  imports: [ListingItemComponent],
  templateUrl: './featured-listings.component.html',
})
export class FeaturedListingsComponent {
  @Input() title = '';
}
