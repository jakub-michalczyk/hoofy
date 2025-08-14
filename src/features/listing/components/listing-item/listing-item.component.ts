import { Component, Input } from '@angular/core';

import { EListingItemType, IListingItem } from './listing-item.model';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { AddToFavouritesComponent } from '../../../shared/add-to-favourites/add-to-favourites.component';

@Component({
  selector: 'hoof-listing-item',
  imports: [AddToFavouritesComponent, RouterLink, DatePipe, CommonModule],
  templateUrl: './listing-item.component.html',
})
export class ListingItemComponent {
  @Input() data?: IListingItem;
  @Input() type = EListingItemType.LISTING;

  EListingItemType = EListingItemType;
}
