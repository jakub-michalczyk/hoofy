import { Component, inject } from '@angular/core';
import { ListingStore } from '../../store/listing.store';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroComponent } from '../../../homepage/components/hero/hero.component';
import { ListingItemComponent } from '../listing-item/listing-item.component';
import { SortOptionsComponent } from '../sort-options/sort-options.component';
import { EGridMode } from '../sort-options/sort-options.model';
import { PaginationComponent } from '../pagination/pagination.component';
import { DetailsFilterComponent } from '../details-filter/details-filter.component';

@Component({
  selector: 'hoof-listing',
  imports: [
    CommonModule,
    ListingItemComponent,
    FormsModule,
    ReactiveFormsModule,
    ListingItemComponent,
    HeroComponent,
    SortOptionsComponent,
    PaginationComponent,
    DetailsFilterComponent,
  ],
  templateUrl: './listing.component.html',
})
export class ListingComponent {
  protected store = inject(ListingStore);
  EGridMode = EGridMode;
}
