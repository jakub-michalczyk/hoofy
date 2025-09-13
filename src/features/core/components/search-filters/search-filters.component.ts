import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { INavigationSubmenuColumn, INavigationSubmenuItem } from '../../model/navigation.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStore } from '../navigation/navigation.store';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { ListingStore } from '../../../listing/store/listing.store';
import { IonButton, IonIcon, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { ESortingOptions } from '../../../listing/components/sort-options/sort-options.model';
import { combineLatest, debounceTime, distinctUntilChanged, filter, Subject } from 'rxjs';

@Component({
  selector: 'hoof-search-filters',
  imports: [IonSelect, IonSelectOption, FormsModule, IonIcon, IonButton],
  templateUrl: './search-filters.component.html',
})
export class SearchFiltersComponent implements OnInit {
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

  sortingOptions = Object.values(ESortingOptions) as ESortingOptions[];

  citySuggestions: string[] = [];
  private cityInput$ = new Subject<string>();

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

  onMainCategoryChange(slug: string): void {
    this.selectedMainCategory = this.mainCategories.find(c => c.slug === slug) ?? null;
    this.subcategories = this.selectedMainCategory?.items ?? [];
    this.selectedSubcategory = null;

    this.store.setCategory(this.selectedMainCategory?.slug ?? null);
    this.store.setSubCategory(null);

    this.router.navigate(['/listing', slug], { queryParamsHandling: 'merge' });
  }

  onSubcategoryChange(subSlug: string): void {
    if (!this.selectedMainCategory) return;

    this.selectedSubcategory = this.subcategories.find(i => i.slug === subSlug) ?? null;
    this.store.setSubCategory(this.selectedSubcategory?.slug ?? null);

    this.router.navigate(['/listing', this.selectedMainCategory.slug, subSlug], {
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  onSearch(): void {
    this.store.setSearchTerm(this.searchTerm);
    this.updateQueryParams({ search: this.searchTerm || null, page: 1 });
  }

  onSortingChange(newSort: ESortingOptions): void {
    this.store.setSorting(newSort);
    this.store.setPage(1);
    this.updateQueryParams({ sorting: newSort, page: 1 });
  }

  onCityInput(): void {
    this.cityInput$.next(this.cityTerm);
  }

  onPriceFromChange(val: string | number | null) {
    const v = val == null || val === '' ? null : +val;
    this.priceFrom = v;
    this.store.setPriceFrom(v);
    this.updateQueryParams({ priceFrom: v, page: 1 });
  }

  onPriceToChange(val: string | number | null) {
    const v = val == null || val === '' ? null : +val;
    this.priceTo = v;
    this.store.setPriceTo(v);
    this.updateQueryParams({ priceTo: v, page: 1 });
  }

  selectCity(city: string): void {
    this.cityTerm = city;
    this.citySuggestions = [];
    this.store.setCity(city);
    this.updateQueryParams({ location: city, page: 1 });
  }

  private updateQueryParams(params: Params): void {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge',
    });
    this.store.searchListings();
  }

  get priceFromValue(): number | null {
    return this.priceFrom;
  }

  set priceFromValue(val: number | null) {
    this.priceFrom = val;
    this.store.setPriceFrom(val);
    this.updateQueryParams({ priceFrom: val, page: 1 });
  }

  get priceToValue(): number | null {
    return this.priceTo;
  }

  set priceToValue(val: number | null) {
    this.priceTo = val;
    this.store.setPriceTo(val);
    this.updateQueryParams({ priceTo: val, page: 1 });
  }
}
