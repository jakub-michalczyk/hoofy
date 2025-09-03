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
  url: string;
  type: string;
  userName: string;
  details?: IListingItemDetails;
}

export interface IListingItemDetails {
  [key: string]: string | number;
  age: number;
  gender: string;
  breed: string;
  color: string;
  height: number;
}

export enum EListingItemView {
  SIMPLE,
  DETAILED,
}
