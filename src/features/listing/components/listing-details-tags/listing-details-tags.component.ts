import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';

import { IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ListingStore } from '../../store/listing.store';
import { IListingItem, ITag } from '../listing-item/listing-item.model';
import {
  ICareFilter,
  IEquipmentFilter,
  IHorseDetails,
  ISpecialistFilter,
  IStableFilter,
  ITrainingFilter,
} from '../../model/filters.model';

@Component({
  selector: 'hoof-listing-details-tags',
  imports: [IonIcon, CommonModule],
  templateUrl: './listing-details-tags.component.html',
})
export class ListingDetailsTagsComponent implements OnChanges {
  @Input() data: IListingItem = {} as IListingItem;
  tags: ITag[] = [];
  store = inject(ListingStore);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.tags = this.buildTags(this.data.details);
    }
  }

  private buildTags(details: unknown): ITag[] {
    if (this.isHorse(details)) {
      return this.store.buildHorseTags(details);
    }
    if (this.isEquipment(details)) {
      return this.store.buildEquipmentTags(details);
    }
    if (this.isCare(details)) {
      return this.store.buildCareTags(details);
    }
    if (this.isStable(details)) {
      return this.store.buildStableTags(details);
    }
    if (this.isSpecialist(details)) {
      return this.store.buildSpecialistTags(details);
    }
    if (this.isTraining(details)) {
      return this.store.buildTrainingTags(details);
    }
    return [];
  }

  private isObject(x: unknown): x is Record<string, unknown> {
    return typeof x === 'object' && x !== null;
  }

  private isHorse(x: unknown): x is IHorseDetails {
    if (!this.isObject(x)) return false;
    return (
      typeof x['age'] === 'number' &&
      typeof x['gender'] === 'string' &&
      typeof x['breed'] === 'string' &&
      typeof x['color'] === 'string' &&
      typeof x['height'] === 'number'
    );
  }

  private isEquipment(x: unknown): x is IEquipmentFilter {
    if (!this.isObject(x)) return false;
    return (
      typeof x['type'] === 'string' &&
      (x['condition'] === 'new' || x['condition'] === 'used') &&
      typeof x['brand'] === 'string' &&
      typeof x['material'] === 'string' &&
      typeof x['color'] === 'string'
    );
  }

  private isCare(x: unknown): x is ICareFilter {
    if (!this.isObject(x)) return false;
    return typeof x['productType'] === 'string' && typeof x['brand'] === 'string';
  }

  private isStable(x: unknown): x is IStableFilter {
    if (!this.isObject(x)) return false;
    return (
      typeof x['location'] === 'string' &&
      typeof x['boxType'] === 'string' &&
      Array.isArray(x['services'])
    );
  }

  private isSpecialist(x: unknown): x is ISpecialistFilter {
    if (!this.isObject(x)) return false;
    return typeof x['specialization'] === 'string' && typeof x['location'] === 'string';
  }

  private isTraining(x: unknown): x is ITrainingFilter {
    if (!this.isObject(x)) return false;
    return (
      typeof x['discipline'] === 'string' &&
      typeof x['trainerLevel'] === 'string' &&
      typeof x['location'] === 'string' &&
      typeof x['forLevel'] === 'string'
    );
  }
}
