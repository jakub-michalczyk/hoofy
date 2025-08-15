import { Component, inject, Input } from '@angular/core';

import { EListingItemView, IListingItem } from './listing-item.model';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { AddToFavouritesComponent } from '../../../shared/add-to-favourites/add-to-favourites.component';
import { ListingStore } from '../../store/listing.store';
import { EGridMode } from '../sort-options/sort-options.model';

@Component({
  selector: 'hoof-listing-item',
  imports: [AddToFavouritesComponent, RouterLink, DatePipe, CommonModule],
  templateUrl: './listing-item.component.html',
})
export class ListingItemComponent {
  @Input() data?: IListingItem;
  @Input() view = EListingItemView.DETAILED;
  store = inject(ListingStore);

  EGridMode = EGridMode;
  EListingItemView = EListingItemView;

  get isDetailedMode() {
    if (
      this.view === EListingItemView.SIMPLE ||
      (this.view === EListingItemView.DETAILED && this.store.gridMode() === EGridMode.GRID)
    ) {
      return false;
    } else {
      return true;
    }
  }
}
