export interface IListingItem {
  id?: string;
  title: string;
  description: string;
  category: string;
  subCategory?: string;
  createdAt: number;
  promoted?: boolean;
  price?: number;
  image: string;
  city: string;
  date: string;
  url: string;
  type: string;
}

export enum EListingItemType {
  CAROUSEL,
  FEATURED,
  LISTING,
}
