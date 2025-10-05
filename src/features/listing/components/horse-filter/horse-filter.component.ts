import { Component, inject, Input, OnChanges } from '@angular/core';
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
export class HorseFilterComponent implements OnChanges {
  @Input() fullSize = false;
  private _addNew = false;
  @Input()
  set addNew(v: boolean | string | null | undefined) {
    this._addNew = typeof v === 'string' ? v === 'true' : !!v;
  }
  get addNew(): boolean {
    return this._addNew;
  }

  ngOnChanges() {
    return this.addNew ? this.setValuesForNewListing() : this.resetValues();
  }

  setValuesForNewListing() {
    this.genders = Object.values(EHorseGender).filter(gender => gender !== EHorseGender.ANY);
    this.breeds = Object.values(EHorseBreed).filter(breed => breed !== EHorseBreed.ANY);
    this.allCoats = Object.values(EHorseCoat).filter(coat => coat !== EHorseCoat.ANY);

    this.filtersStore.updateHorseFilter('gender', EHorseGender.MARE);
    this.filtersStore.updateHorseFilter('breed', EHorseBreed.OTHER);
    this.filtersStore.updateHorseFilter('coat', EHorseCoat.OTHER);
  }

  resetValues() {
    this.genders = Object.values(EHorseGender);
    this.breeds = Object.values(EHorseBreed);
    this.allCoats = Object.values(EHorseCoat);

    this.filtersStore.updateHorseFilter('gender', EHorseGender.ANY);
    this.filtersStore.updateHorseFilter('breed', EHorseBreed.ANY);
    this.filtersStore.updateHorseFilter('coat', EHorseCoat.ANY);
  }

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
