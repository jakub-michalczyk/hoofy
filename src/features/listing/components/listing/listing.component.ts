import { Component, inject } from '@angular/core';
import { ListingStore } from '../../store/listing.store';
import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroComponent } from '../../../homepage/components/hero/hero.component';
import { ListingItemComponent } from '../listing-item/listing-item.component';
import { IListingItem } from '../listing-item/listing-item.model';

@Component({
  selector: 'hoof-listing',
  imports: [
    CommonModule,
    ListingItemComponent,
    FormsModule,
    ReactiveFormsModule,
    ListingItemComponent,
    HeroComponent,
  ],
  templateUrl: './listing.component.html',
})
export class ListingComponent {
  protected store = inject(ListingStore);

  listings$: Observable<IListingItem[]>;

  constructor() {
    this.listings$ = this.store.getSearchResults();
  }
}
