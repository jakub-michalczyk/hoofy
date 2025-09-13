import { Component, inject } from '@angular/core';
import { EHorseGender, IHorseDetails } from '../listing-item/listing-item.model';
import { ListingStore } from '../../store/listing.store';
import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonRange,
  IonSelect,
  IonSelectOption,
  PopoverController,
} from '@ionic/angular/standalone';
import { breedToCoatsMap, EHorseBreed, EHorseCoat } from '../details-filter/details-filter.model';
import { BreedPopoverComponent } from '../breed-popover/breed-popover.component';
import type { RangeValue } from '@ionic/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hoof-horse-filter',
  imports: [
    IonIcon,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonButton,
    IonLabel,
    IonRange,
    CommonModule,
  ],
  templateUrl: './horse-filter.component.html',
})
export class HorseFilterComponent {
  protected store = inject(ListingStore);
  private popoverCtrl = inject(PopoverController);

  genders = Object.values(EHorseGender);
  breeds = Object.values(EHorseBreed);
  allCoats = Object.values(EHorseCoat);

  update<K extends keyof IHorseDetails>(key: K, value: IHorseDetails[K]) {
    this.store.updateHorseFilter(key, value);
    this.store.searchListings();
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
    return this.store.horseFilters();
  }

  get availableCoats(): EHorseCoat[] {
    const b = this.horse.breed as EHorseBreed;
    return breedToCoatsMap[b] ?? this.allCoats;
  }
}
