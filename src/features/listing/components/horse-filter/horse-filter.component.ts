import { Component, inject } from '@angular/core';
import { ListingStore } from '../../store/listing.store';
import {
  IonButton,
  IonIcon,
  IonRange,
  IonSelect,
  IonSelectOption,
  PopoverController,
} from '@ionic/angular/standalone';

import { BreedPopoverComponent } from '../breed-popover/breed-popover.component';
import type { RangeValue } from '@ionic/core';
import { CommonModule } from '@angular/common';
import {
  breedToCoatsMap,
  EHorseBreed,
  EHorseCoat,
  EHorseGender,
  IHorseDetails,
} from '../../model/filters.model';
import { FiltersStore } from '../../store/filters.store';

@Component({
  selector: 'hoof-horse-filter',
  imports: [IonIcon, IonSelect, IonSelectOption, IonButton, IonRange, CommonModule],
  templateUrl: './horse-filter.component.html',
})
export class HorseFilterComponent {
  protected listingStore = inject(ListingStore);
  protected filtersStore = inject(FiltersStore);
  private popoverCtrl = inject(PopoverController);

  genders = Object.values(EHorseGender);
  breeds = Object.values(EHorseBreed);
  allCoats = Object.values(EHorseCoat);

  update<K extends keyof IHorseDetails>(key: K, value: IHorseDetails[K]) {
    this.filtersStore.updateHorseFilter(key, value);
    this.listingStore.searchListings();
  }

  onRangeChange(value: RangeValue, key: string) {
    this.update(key, value as number);
  }

  async openBreedPopover(ev: Event) {
    const pop = await this.popoverCtrl.create({
      component: BreedPopoverComponent,
      event: ev,
      translucent: true,
      componentProps: {
        allBreeds: this.breeds,
        selected: this.horse.breed,
      },
    });
    await pop.present();
    const { data } = await pop.onWillDismiss<string>();
    if (data) this.update('breed', data);
  }

  get horse() {
    return this.filtersStore.horseFilters();
  }

  get availableCoats(): EHorseCoat[] {
    const b = this.horse.breed as EHorseBreed;
    return breedToCoatsMap[b] ?? this.allCoats;
  }
}
