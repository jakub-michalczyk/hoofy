import { Component, computed, inject, Signal } from '@angular/core';
import { ListingStore } from '../../store/listing.store';
import { HorseFilterComponent } from '../horse-filter/horse-filter.component';
import { CommonModule } from '@angular/common';
import { ECategoryName } from '../../../core/model/category.model';

@Component({
  selector: 'hoof-details-filter',
  imports: [HorseFilterComponent, CommonModule],
  templateUrl: './details-filter.component.html',
})
export class DetailsFilterComponent {
  private store = inject(ListingStore);
  readonly category: Signal<ECategoryName> = computed(() => this.store.category() as ECategoryName);
}
