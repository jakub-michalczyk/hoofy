import { Component, inject, Input } from '@angular/core';

import { EListingItemView, IListingItem } from './listing-item.model';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { AddToFavouritesComponent } from '../../../shared/components/add-to-favourites/add-to-favourites.component';
import { ListingStore } from '../../store/listing.store';
import { EGridMode } from '../sort-options/sort-options.model';
import { ListingDetailsTagsComponent } from '../listing-details-tags/listing-details-tags.component';
import { TitleComponent } from '../../../shared/components/title/title.component';

@Component({
  selector: 'hoof-listing-item',
  imports: [
    AddToFavouritesComponent,
    RouterLink,
    DatePipe,
    CommonModule,
    TitleComponent,
    ListingDetailsTagsComponent,
  ],
  templateUrl: './listing-item.component.html',
})
export class ListingItemComponent {
  @Input() data?: IListingItem;
  @Input() view = EListingItemView.DETAILED;
  protected store = inject(ListingStore);

  protected EGridMode = EGridMode;
  protected EListingItemView = EListingItemView;

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
