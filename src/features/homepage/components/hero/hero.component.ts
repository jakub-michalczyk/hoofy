import { Component, OnInit, HostListener, inject, DestroyRef, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ListingStore } from '../../../listing/store/listing.store';
import { NavigationStore } from '../../../core/components/navigation/navigation.store';
import { LocationService } from '../../../core/services/location.service';
import {
  INavigationSubmenuColumn,
  INavigationSubmenuItem,
} from '../../../core/model/navigation.model';
import { ESortingOptions } from '../../../listing/components/sort-options/sort-options.model';
import { SearchFiltersComponent } from '../../../core/components/search-filters/search-filters.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'hoof-hero',
  templateUrl: './hero.component.html',
  imports: [SearchFiltersComponent, CommonModule, IonIcon, FormsModule],
})
export class HeroComponent implements OnInit {
  @Input() bgImage = 'homepage_bg';
  @Input() isListing = false;

  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public store = inject(ListingStore);
  private navigation = inject(NavigationStore);
  private locationService = inject(LocationService);

  mainCategories: INavigationSubmenuColumn[] = [];
  subcategories: INavigationSubmenuItem[] = [];
  selectedMainCategory: INavigationSubmenuColumn | null = null;
  selectedSubcategory: INavigationSubmenuItem | null = null;

  searchTerm = '';
  cityTerm = '';
  priceFrom: number | null = null;
  priceTo: number | null = null;

  citySuggestions: string[] = [];
  private cityInput$ = new Subject<string>();

  sortingOptions = Object.values(ESortingOptions) as ESortingOptions[];

  ngOnInit(): void {
    this.mainCategories = this.navigation.getMainCategories();
    this.cityInput$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(term => term.length >= 2),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(term =>
        this.locationService
          .searchCities(term)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(results => (this.citySuggestions = results))
      );

    combineLatest([this.route.paramMap, this.route.queryParamMap])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([pm, qp]) => this.syncRouteAndQuery(pm, qp));
  }

  private syncRouteAndQuery(pm: ParamMap, qp: ParamMap): void {
    const mainSlug = pm.get('mainCat') ?? '';
    const subSlug = pm.get('subCat') ?? '';

    this.selectedMainCategory = this.mainCategories.find(c => c.slug === mainSlug) ?? null;
    this.subcategories = this.selectedMainCategory?.items ?? [];
    this.store.setCategory(this.selectedMainCategory?.slug ?? null);

    this.selectedSubcategory =
      this.selectedMainCategory && subSlug
        ? (this.selectedMainCategory.items.find(i => i.slug === subSlug) ?? null)
        : null;
    this.store.setSubCategory(this.selectedSubcategory?.slug ?? null);

    this.searchTerm = qp.get('search') ?? '';
    this.cityTerm = qp.get('location') ?? '';
    this.priceFrom = qp.has('priceFrom') ? +qp.get('priceFrom')! : null;
    this.priceTo = qp.has('priceTo') ? +qp.get('priceTo')! : null;

    const sorting = (qp.get('sorting') as ESortingOptions) ?? ESortingOptions.NEWEST;
    const page = qp.has('page') ? +qp.get('page')! : 1;

    this.store.setSearchTerm(this.searchTerm);
    this.store.setCity(this.cityTerm);
    this.store.setPriceFrom(this.priceFrom);
    this.store.setPriceTo(this.priceTo);
    this.store.setSorting(sorting);
    this.store.setPage(page);

    this.store.searchListings();
  }

  toggleCategory(index: number): void {
    this.mainCategories = this.mainCategories.map((cat, i) => ({
      ...cat,
      active: i === index ? !cat.active : false,
    }));

    const sel = this.mainCategories[index].active ? this.mainCategories[index] : null;
    this.selectedMainCategory = sel;
    this.subcategories = sel?.items ?? [];
    this.selectedSubcategory = null;

    this.store.setCategory(sel?.slug ?? null);
    this.store.setSubCategory(null);
  }

  onSearch(): void {
    this.store.setSearchTerm(this.searchTerm);
    this.store.setCity(this.cityTerm);
    this.store.setPriceFrom(this.priceFrom);
    this.store.setPriceTo(this.priceTo);

    const path = ['listing'];
    const main = this.store.category();
    if (main) path.push(main);
    const sub = this.store.subCategory();
    if (sub) path.push(sub);

    const qp: Params = {
      sorting: this.store.sorting() || ESortingOptions.NEWEST.toLowerCase(),
      page: this.store.currentPage() || 1,
    };
    if (this.searchTerm) qp['search'] = this.searchTerm;
    if (this.cityTerm) qp['location'] = this.cityTerm;
    if (this.priceFrom != null) qp['priceFrom'] = this.priceFrom;
    if (this.priceTo != null) qp['priceTo'] = this.priceTo;

    this.router.navigate(path, {
      queryParams: qp,
      queryParamsHandling: 'merge',
    });

    this.store.searchListings();
  }

  onSortingChange(newSort: ESortingOptions): void {
    this.store.setSorting(newSort);
    this.store.setPage(1);
    const path = ['listing', ...(this.store.category() ? [this.store.category()!] : [])];
    this.router.navigate(path, {
      queryParams: { sorting: newSort, page: 1 },
      queryParamsHandling: 'merge',
    });
    this.store.searchListings();
  }

  onCityInput(): void {
    this.cityInput$.next(this.cityTerm);
  }

  selectCity(city: string | null): void {
    if (city === null) {
      this.cityTerm = '';
      this.store.setCity('');
    } else {
      this.cityTerm = city;
      this.citySuggestions = [];
      this.store.setCity(city);
    }

    this.updateListingView(city);
  }

  updateListingView(city: string | null) {
    this.router.navigate([], {
      queryParams: { location: city, page: 1 },
      queryParamsHandling: 'merge',
    });
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('input') && !target.closest('ul')) {
      this.citySuggestions = [];
    }
  }
}
