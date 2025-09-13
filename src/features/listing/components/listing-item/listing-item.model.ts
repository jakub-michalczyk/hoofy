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
  city: string;
  date: string;
  type: string;
  userName: string;
  details?:
    | IHorseDetails
    | IEquipmentFilter
    | ICareFilter
    | IStableFilter
    | ISpecialistFilter
    | ITrainingFilter;
}

export interface IHorseDetails {
  [key: string]: string | number;
  age: number;
  gender: EHorseGender;
  breed: string;
  coat: string;
  height: number;
}

export enum EHorseGender {
  MARE = 'Klacz',
  STALION = 'Ogier',
  GELDING = 'Wałach',
  ANY = 'Każda',
}

export interface IEquipmentFilter {
  type: string;
  condition: 'new' | 'used';
  brand: string;
  material: string;
  color: string;
}

export interface ICareFilter {
  productType: string;
  brand: string;
  forAgeGroup?: string;
  forCondition?: string;
  organic?: boolean;
}

export interface IStableFilter {
  location: string;
  boxType: string;
  services: string[];
  maxCapacity?: number;
  indoorArena?: boolean;
  outdoorArena?: boolean;
}

export interface ISpecialistFilter {
  specialization: string;
  location: string;
  mobileService?: boolean;
  experienceYears?: number;
  certifications?: string[];
  availableDays?: string[];
}

export interface ITrainingFilter {
  discipline: string;
  trainerLevel: string;
  location: string;
  forLevel: string;
  groupSize?: number;
  indoor?: boolean;
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
