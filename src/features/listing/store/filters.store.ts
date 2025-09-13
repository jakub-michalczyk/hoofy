import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  EHorseBreed,
  EHorseCoat,
  EHorseGender,
  IFiltersState,
  IHorseDetails,
} from '../model/filters.model';

export const FILTER_STATE: IFiltersState = {
  horseFilters: {
    age: 40,
    gender: EHorseGender.ANY,
    breed: EHorseBreed.ANY,
    coat: EHorseCoat.ANY,
    height: 220,
  },
  equipmentFilters: { type: '', condition: 'new', brand: '', material: '', color: '' },
  careFilters: {
    productType: '',
    brand: '',
    forAgeGroup: undefined,
    forCondition: undefined,
    organic: undefined,
  },
  stableFilters: {
    location: '',
    boxType: '',
    services: [],
    maxCapacity: undefined,
    indoorArena: undefined,
    outdoorArena: undefined,
  },
  specialistFilters: {
    specialization: '',
    location: '',
    mobileService: undefined,
    experienceYears: undefined,
    certifications: undefined,
    availableDays: undefined,
  },
  trainingFilters: {
    discipline: '',
    trainerLevel: '',
    location: '',
    forLevel: '',
    groupSize: undefined,
    indoor: undefined,
  },
};

export const FiltersStore = signalStore(
  { providedIn: 'root' },
  withState<IFiltersState>(FILTER_STATE),
  withMethods(store => ({
    updateHorseFilter<K extends keyof IHorseDetails>(key: K, value: IHorseDetails[K]) {
      patchState(store, {
        horseFilters: { ...store.horseFilters(), [key]: value },
      });
    },
    resetAllFilters() {
      patchState(store, FILTER_STATE);
    },
  }))
);
