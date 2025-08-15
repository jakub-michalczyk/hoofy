import { Component, inject } from '@angular/core';
import { IonIcon, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { EGridMode, ESortingOptions } from './sort-options.model';
import { CommonModule } from '@angular/common';
import { ListingStore } from '../../store/listing.store';

@Component({
  selector: 'hoof-sort-options',
  imports: [IonIcon, IonSelect, IonSelectOption, CommonModule],
  templateUrl: './sort-options.component.html',
})
export class SortOptionsComponent {
  store = inject(ListingStore);
  EGridMode = EGridMode;
  ESortingOptions = ESortingOptions;

  toggleMode() {
    const current = this.store.gridMode();
    const next = current === EGridMode.GRID ? EGridMode.LIST : EGridMode.GRID;
    this.store.setGridMode(next);
  }

  onSortingChange(value: ESortingOptions) {
    this.store.setSorting(value);
    this.store.searchListings();
  }
}
