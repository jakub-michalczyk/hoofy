import { Injectable, inject, signal, computed, Signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { forkJoin } from 'rxjs';
import { LocationService } from './location.service';
import { ListingStore } from '../../listing/store/listing.store';
import { NavigationStore } from '../store/navigation.store';
import { INavigationSubmenuColumn, INavigationSubmenuItem } from '../model/navigation.model';
import { ESortingOptions } from '../../listing/components/sort-options/sort-options.model';

@Injectable({ providedIn: 'root' })
export class ListingFiltersFacadeService {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public listingStore = inject(ListingStore);
  private navStore = inject(NavigationStore);
  private locService = inject(LocationService);

  mainCategories: Signal<INavigationSubmenuColumn[]> = computed(() => {
    const all = this.navStore.getMainCategories();
    const sel = this.selectedMain();
    return all.map(cat => ({ ...cat, active: sel?.slug === cat.slug }));
  });
  selectedMain = signal<INavigationSubmenuColumn | null>(null);
  subcategories: WritableSignal<INavigationSubmenuItem[]> = signal([]);
  selectedSub = signal<INavigationSubmenuItem | null>(null);

  searchTerm = signal<string>('');
  cityTerm = signal<string>('');
  priceFrom = signal<number | null>(null);
  priceTo = signal<number | null>(null);
  sorting = signal<ESortingOptions>(ESortingOptions.NEWEST);

  citySuggestions = signal<string[]>([]);

  constructor() {
    this.syncRouteWithState();
  }

  private syncRouteWithState(): void {
    this.route.paramMap.subscribe(v => console.log(v));
    forkJoin([this.route.paramMap, this.route.queryParamMap]).subscribe(([pm, qp]) =>
      this.applyRoute(pm, qp)
    );
  }

  private applyRoute(pm: ParamMap, qp: ParamMap): void {
    const mainSlug = pm.get('mainCat') ?? '';
    const subSlug = pm.get('subCat') ?? '';
    const mains = this.navStore.getMainCategories();
    const main = mains.find(c => c.slug === mainSlug) ?? null;
    const subs = main?.items ?? [];
    const sub = subs.find(i => i.slug === subSlug) ?? null;

    this.selectedMain.set(main);
    this.subcategories.set(subs);
    this.selectedSub.set(sub);

    this.listingStore.setCategory(main?.slug ?? null);
    this.listingStore.setSubCategory(sub?.slug ?? null);

    const search = qp.get('search') ?? '';
    const location = qp.get('location') ?? '';
    const from = qp.has('priceFrom') ? +qp.get('priceFrom')! : null;
    const to = qp.has('priceTo') ? +qp.get('priceTo')! : null;
    const sort = (qp.get('sorting') as ESortingOptions) ?? ESortingOptions.NEWEST;
    const page = qp.has('page') ? +qp.get('page')! : 1;

    this.searchTerm.set(search);
    this.cityTerm.set(location);
    this.priceFrom.set(from);
    this.priceTo.set(to);
    this.sorting.set(sort);

    this.listingStore.setSearchTerm(search);
    this.listingStore.setCity(location);
    this.listingStore.setPriceFrom(from);
    this.listingStore.setPriceTo(to);
    this.listingStore.setSorting(sort);
    this.listingStore.setPage(page);

    this.listingStore.searchListings();
  }

  onSearch(): void {
    const search = this.searchTerm();
    const location = this.cityTerm();
    const from = this.priceFrom();
    const to = this.priceTo();
    const sort = this.sorting();

    this.listingStore.setSearchTerm(search);
    this.listingStore.setCity(location);
    this.listingStore.setPriceFrom(from);
    this.listingStore.setPriceTo(to);
    this.listingStore.setPage(1);

    const qp: Params = {
      page: 1,
      sorting: sort,
      ...(search && { search }),
      ...(location && { location }),
      ...(from != null && { priceFrom: from }),
      ...(to != null && { priceTo: to }),
    };

    const path = ['listing', ...(this.selectedMain()?.slug ? [this.selectedMain()!.slug] : [])];
    this.router.navigate(path, { queryParams: qp, queryParamsHandling: 'merge' });
    this.listingStore.searchListings();
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

    this.selectedMain.set(selected);
    this.subcategories.set(selected?.items ?? []);
    this.selectedSub.set(null);

    this.listingStore.setCategory(selected?.slug ?? null);
    this.listingStore.setSubCategory(null);

    if (navigate) {
      const path = selected?.slug ? ['/listing', selected.slug] : ['/listing'];
      this.router.navigate(path, { queryParamsHandling: 'merge' });
      this.onSearch();
    }
  }

  onSubcategoryChange(subSlug: string): void {
    const main = this.selectedMain();
    if (!main) return;

    const candidate = main.items.find(item => item.slug === subSlug) ?? null;
    const selected = this.selectedSub()?.slug === candidate?.slug ? null : candidate;

    this.selectedSub.set(selected);
    this.listingStore.setSubCategory(selected?.slug ?? null);

    const base = ['/listing', main.slug];
    const path = selected ? [...base, selected.slug] : base;
    this.router.navigate(path, {
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });

    this.onSearch();
  }
}
