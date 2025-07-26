import { Component, Input } from '@angular/core';
import { AddToFavouritesComponent } from '../../add-to-favourites/add-to-favourites.component';
import { IListingItem } from './listing-item.model';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'hoof-listing-item',
  imports: [AddToFavouritesComponent, RouterLink, DatePipe],
  templateUrl: './listing-item.component.html',
})
export class ListingItemComponent {
  @Input() data?: IListingItem;
  @Input() showDescription = false;
}
