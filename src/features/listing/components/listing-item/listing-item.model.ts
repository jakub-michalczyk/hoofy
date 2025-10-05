import {
  ICareFilter,
  IEquipmentFilter,
  IHorseDetails,
  ISpecialistFilter,
  IStableFilter,
  ITrainingFilter,
} from '../../model/filters.model';

export interface IListingItem {
  id?: string;
  title: string;
  description: string;
  category: string;
  subCategory?: string;
  createdAt: number;
  promoted?: boolean;
  price?: number;
  images: string[];
  location: string;
  date: string;
  type: string;
  userId: string;
  lng: number;
  lat: number;
  details?:
    | IHorseDetails
    | IEquipmentFilter
    | ICareFilter
    | IStableFilter
    | ISpecialistFilter
    | ITrainingFilter;
}

export interface ITag {
  icon: string;
  label: string;
  value: string | number;
  unit?: string;
}

export enum EListingItemView {
  SIMPLE,
  DETAILED,
}
