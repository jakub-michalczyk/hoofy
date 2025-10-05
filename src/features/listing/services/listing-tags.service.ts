import { Injectable } from '@angular/core';
import {
  ICareFilter,
  IEquipmentFilter,
  IHorseDetails,
  ISpecialistFilter,
  IStableFilter,
  ITrainingFilter,
} from '../model/filters.model';
import { ITag } from '../components/listing-item/listing-item.model';

@Injectable({ providedIn: 'root' })
export class ListingTagsService {
  buildHorseTags(h: IHorseDetails): ITag[] {
    return [
      { icon: 'age', label: 'Wiek', value: h.age, unit: 'lat' },
      { icon: 'gender', label: 'Płeć', value: h.gender },
      { icon: 'breed', label: 'Rasa', value: h.breed },
      { icon: 'color', label: 'Maść', value: h.coat },
      { icon: 'height', label: 'Wzrost w kłębie', value: h.height, unit: 'cm' },
    ];
  }

  buildEquipmentTags(e: IEquipmentFilter): ITag[] {
    return [
      { icon: 'construct', label: 'Typ', value: e.type },
      { icon: 'clipboard', label: 'Stan', value: e.condition },
      { icon: 'pricetag', label: 'Marka', value: e.brand },
      { icon: 'color-fill', label: 'Materiał', value: e.material },
      { icon: 'color-palette', label: 'Kolor', value: e.color },
    ];
  }

  buildCareTags(c: ICareFilter): ITag[] {
    const base: ITag[] = [
      { icon: 'medkit', label: 'Typ produktu', value: c.productType },
      { icon: 'pricetag', label: 'Marka', value: c.brand },
    ];
    if (c.forAgeGroup) {
      base.push({ icon: 'people', label: 'Wiek użytkownika', value: c.forAgeGroup });
    }
    if (c.forCondition) {
      base.push({ icon: 'heart', label: 'Stan', value: c.forCondition });
    }
    if (c.organic !== undefined) {
      base.push({ icon: 'leaf', label: 'Organiczne', value: c.organic ? 'tak' : 'nie' });
    }
    return base;
  }

  buildStableTags(s: IStableFilter): ITag[] {
    const base: ITag[] = [
      { icon: 'location', label: 'Lokalizacja', value: s.location },
      { icon: 'cube', label: 'Rodzaj boksu', value: s.boxType },
      { icon: 'people', label: 'Usługi', value: s.services.join(', ') },
    ];
    if (s.maxCapacity !== undefined) {
      base.push({ icon: 'people', label: 'Max pojemność', value: s.maxCapacity });
    }
    if (s.indoorArena) {
      base.push({ icon: 'home', label: 'Arena wewnętrzna', value: 'tak' });
    }
    if (s.outdoorArena) {
      base.push({ icon: 'sunny', label: 'Arena zewnętrzna', value: 'tak' });
    }
    return base;
  }

  buildSpecialistTags(sp: ISpecialistFilter): ITag[] {
    const base: ITag[] = [
      { icon: 'medical', label: 'Specjalizacja', value: sp.specialization },
      { icon: 'location', label: 'Lokalizacja', value: sp.location },
      { icon: 'calendar', label: 'Mobilny serwis', value: sp.mobileService ? 'tak' : 'nie' },
    ];
    if (sp.experienceYears !== undefined) {
      base.push({ icon: 'trophy', label: 'Doświadczenie', value: sp.experienceYears });
    }
    if (sp.certifications?.length) {
      base.push({ icon: 'ribbon', label: 'Certyfikaty', value: sp.certifications.join(', ') });
    }
    if (sp.availableDays?.length) {
      base.push({
        icon: 'calendar-number',
        label: 'Dostępne dni',
        value: sp.availableDays.join(', '),
      });
    }
    return base;
  }

  buildTrainingTags(t: ITrainingFilter): ITag[] {
    const base: ITag[] = [
      { icon: 'sport', label: 'Dyscyplina', value: t.discipline },
      { icon: 'star', label: 'Poziom trenera', value: t.trainerLevel },
      { icon: 'location', label: 'Lokalizacja', value: t.location },
      { icon: 'school', label: 'Dla poziomu', value: t.forLevel },
    ];
    if (t.groupSize !== undefined) {
      base.push({ icon: 'people', label: 'Wielkość grupy', value: t.groupSize });
    }
    if (t.indoor !== undefined) {
      base.push({ icon: 'home', label: 'Sala wewnętrzna', value: t.indoor ? 'tak' : 'nie' });
    }
    return base;
  }

  buildTags(details: unknown): ITag[] {
    if (this.isHorse(details)) {
      return this.buildHorseTags(details);
    }
    if (this.isEquipment(details)) {
      return this.buildEquipmentTags(details);
    }
    if (this.isCare(details)) {
      return this.buildCareTags(details);
    }
    if (this.isStable(details)) {
      return this.buildStableTags(details);
    }
    if (this.isSpecialist(details)) {
      return this.buildSpecialistTags(details);
    }
    if (this.isTraining(details)) {
      return this.buildTrainingTags(details);
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
      typeof x['coat'] === 'string' &&
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
