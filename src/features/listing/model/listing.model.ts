import { DocumentSnapshot } from 'firebase/firestore';
import { EGridMode, ESortingOptions } from '../components/sort-options/sort-options.model';
import { IListingItem } from '../components/listing-item/listing-item.model';
import { EListingType } from '../../core/model/category.model';

export interface IListingState {
  searchTerm: string;
  location: string;
  listingType: EListingType.ADS | EListingType.SERVICES | null;
  category: string | null;
  subCategory: string | null;

  featured: IListingItem[];
  latest: IListingItem[];
  similar: IListingItem[];

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
  listingCords: { lat: number | null; lng: number | null };
}
