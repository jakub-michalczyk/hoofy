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
}

export enum EListingItemView {
  SIMPLE,
  DETAILED,
}
