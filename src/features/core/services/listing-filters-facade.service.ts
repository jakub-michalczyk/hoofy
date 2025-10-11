import { Injectable, inject, signal, computed, DestroyRef } from '@angular/core';
import { Router, ParamMap, Params } from '@angular/router';
import { combineLatest, filter, map, switchMap } from 'rxjs';
import { LocationService } from './location.service';
import { ListingStore } from '../../listing/store/listing.store';
import { NavigationStore } from '../store/navigation.store';
import { INavigationSubmenuColumn, INavigationSubmenuItem } from '../model/navigation.model';
import { ESortingOptions } from '../../listing/components/sort-options/sort-options.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ListingFiltersFacadeService {
  private router = inject(Router);
  private listingStore = inject(ListingStore);
  private navStore = inject(NavigationStore);
  private locService = inject(LocationService);
  private destroyerRef = inject(DestroyRef);

  public mainCategories = computed<INavigationSubmenuColumn[]>(() => {
    const currentSlug = this.listingStore.category();
    return this.navStore.getMainCategories().map(cat => ({
      ...cat,
      active: cat.slug === currentSlug,
    }));
  });

  public subcategories = computed<INavigationSubmenuItem[]>(() => {
    const mainSlug = this.listingStore.category();
    const main = this.navStore.getMainCategories().find(c => c.slug === mainSlug);
    return main?.items ?? [];
  });

  public selectedMain = computed<INavigationSubmenuColumn | null>(() => {
    return this.mainCategories().find(c => c.active) ?? null;
  });

  public selectedSub = computed<INavigationSubmenuItem | null>(() => {
    const subSlug = this.listingStore.subCategory();
    return this.subcategories().find(s => s.slug === subSlug) ?? null;
  });

  public searchTerm = signal<string>(this.listingStore.searchTerm());
  public cityTerm = signal<string>(this.listingStore.location());
  public priceFrom = signal<number | null>(this.listingStore.priceFrom());
  public priceTo = signal<number | null>(this.listingStore.priceTo());
  public sorting = signal<ESortingOptions>(this.listingStore.sorting());

  public citySuggestions = signal<string[]>([]);

  constructor() {
    this.syncRouteWithState();
    this.syncLocalSignalsWithStore();
  }

  private syncLocalSignalsWithStore(): void {
    const update = () => {
      this.searchTerm.set(this.listingStore.searchTerm());
      this.cityTerm.set(this.listingStore.location());
      this.priceFrom.set(this.listingStore.priceFrom());
      this.priceTo.set(this.listingStore.priceTo());
      this.sorting.set(this.listingStore.sorting());
    };

    // initial sync
    update();

    this.router.events
      .pipe(
        filter(e => e.constructor.name === 'NavigationEnd'),
        takeUntilDestroyed(this.destroyerRef)
      )
      .subscribe(() => update());
  }

  private syncRouteWithState(): void {
    this.router.events
      .pipe(
        filter(event => event.constructor.name === 'NavigationEnd'),
        map(() => this.router.routerState.root),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        switchMap(route => combineLatest([route.paramMap, route.queryParamMap]))
      )
      .pipe(takeUntilDestroyed(this.destroyerRef))
      .subscribe(([pm, qp]) => this.applyRoute(pm, qp));
  }

  private applyRoute(pm: ParamMap, qp: ParamMap): void {
    const isMap = this.isMapRoute();
    const mainSlug = pm.get('mainCat') ?? '';
    const subSlug = pm.get('subCat') ?? '';

    this.listingStore.setCategory(mainSlug || null);
    this.listingStore.setSubCategory(subSlug || null);

    const search = qp.get('search') ?? '';
    const location = qp.get('location') ?? '';
    const from = qp.has('priceFrom') ? +qp.get('priceFrom')! : null;
    const to = qp.has('priceTo') ? +qp.get('priceTo')! : null;

    this.searchTerm.set(search);
    this.cityTerm.set(location);
    this.priceFrom.set(from);
    this.priceTo.set(to);

    this.listingStore.setSearchTerm(search);
    this.listingStore.setCity(location);
    this.listingStore.setPriceFrom(from);
    this.listingStore.setPriceTo(to);

    if (!isMap) {
      const sort = (qp.get('sorting') as ESortingOptions) ?? ESortingOptions.NEWEST;
      const page = qp.has('page') ? +qp.get('page')! : 1;

      this.sorting.set(sort);
      this.listingStore.setSorting(sort);
      this.listingStore.setPage(page);
    }

    this.listingStore.searchListings();
  }

  onSearch(): void {
    const search = this.searchTerm();
    const location = this.cityTerm();
    const from = this.priceFrom();
    const to = this.priceTo();

    this.listingStore.setSearchTerm(search);
    this.listingStore.setCity(location);
    this.listingStore.setPriceFrom(from);
    this.listingStore.setPriceTo(to);
    this.listingStore.searchListings();
  }

  navigateToListing(): void {
    const path = this.buildPath();
    const qp = this.buildQueryParams();

    this.router.navigate(path, { queryParams: qp });
  }

  onSortingChange(newSort: ESortingOptions): void {
    this.sorting.set(newSort);
    this.listingStore.setSorting(newSort);
    this.onSearch();
  }

  onCityInput(term: string): void {
    this.cityTerm.set(term);
    if (term.length < 2) {
      this.citySuggestions.set([]);
      return;
    }
    this.locService.searchCities(term).subscribe(list => this.citySuggestions.set(list));
  }

  clearSuggestions(): void {
    this.citySuggestions.set([]);
  }

  selectCity(city: string | null): void {
    this.cityTerm.set(city ?? '');
    this.listingStore.setCity(city ?? '');
    this.clearSuggestions();
    this.onSearch();
  }

  onMainCategoryChange(slug: string, navigate: boolean): void {
    const all = this.navStore.getMainCategories();
    const updated = all.map(cat => ({
      ...cat,
      active: cat.slug === slug ? !cat.active : false,
    }));
    const selected = updated.find(cat => cat.active) ?? null;

    this.listingStore.setCategory(selected?.slug ?? null);
    this.listingStore.setSubCategory(null);
    return navigate ? this.navigateToListing() : this.onSearch();
  }

  onSubcategoryChange(subSlug: string, navigate: boolean): void {
    const main = this.selectedMain();
    if (!main) return;

    const candidate = main.items.find(item => item.slug === subSlug) ?? null;
    const selected = this.selectedSub()?.slug === candidate?.slug ? null : candidate;
    this.listingStore.setSubCategory(selected?.slug ?? null);

    return navigate ? this.navigateToListing() : this.onSearch();
  }

  buildQueryParams(): Params {
    const search = this.searchTerm();
    const location = this.cityTerm();
    const from = this.priceFrom();
    const to = this.priceTo();

    const qp: Params = {
      ...(search && { search }),
      ...(location && { location }),
      ...(from != null && { priceFrom: from }),
      ...(to != null && { priceTo: to }),
    };

    if (!this.isMapRoute()) {
      qp['page'] = 1;
      qp['sorting'] = this.sorting();
    }

    return qp;
  }

  private isMapRoute(): boolean {
    const firstSegment = this.router.url.split('?')[0].split('/')[1];
    return firstSegment === 'map';
  }

  private buildPath(): string[] {
    const base = this.getBaseRoute();
    const main = this.listingStore.category();
    const sub = this.listingStore.subCategory();

    return [base, ...(main ? [main] : []), ...(sub ? [sub] : [])];
  }

  private getBaseRoute(): 'map' | 'listing' {
    const raw = this.router.url.split('?')[0];
    const first = raw.split('/')[1] as string;
    return first === 'map' ? 'map' : 'listing';
  }
}
