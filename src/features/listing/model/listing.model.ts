import { DocumentSnapshot } from 'firebase/firestore';
import { EGridMode, ESortingOptions } from '../components/sort-options/sort-options.model';
import { IListingItem } from '../components/listing-item/listing-item.model';

export interface IListingState {
  searchTerm: string;
  city: string;
  listingType: 'ads' | 'services' | null;
  category: string | null;
  subCategory: string | null;

  featured: IListingItem[];
  latest: IListingItem[];

  searchResults: IListingItem[];
  isSearching: boolean;

  gridMode: EGridMode;
  sorting: ESortingOptions;

  priceFrom: number | null;
  priceTo: number | null;
  pendingPriceFrom: number | null;
  pendingPriceTo: number | null;

  currentPage: number;
  pageSize: number;
  pageCursors: DocumentSnapshot[];
  totalCount: number;

  visible: IListingItem[];
}
