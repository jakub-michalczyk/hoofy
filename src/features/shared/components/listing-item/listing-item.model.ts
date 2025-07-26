export interface IListingItem {
  id?: string;
  title: string;
  description: string;
  createdAt: number;
  promoted?: boolean;
  price?: number;
  image: string;
  city: string;
  date: string;
  url: string;
}
