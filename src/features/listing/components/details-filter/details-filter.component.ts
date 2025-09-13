import { Component, computed, inject, Signal } from '@angular/core';
import { ListingStore } from '../../store/listing.store';

import { Category } from './details-filter.model';
import { HorseFilterComponent } from '../horse-filter/horse-filter.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hoof-details-filter',
  imports: [HorseFilterComponent, CommonModule],
  templateUrl: './details-filter.component.html',
})
export class DetailsFilterComponent {
  private store = inject(ListingStore);
  readonly category: Signal<Category> = computed(() => this.store.category() as Category);
}
