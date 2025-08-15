import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { INavigationSubmenuColumn, INavigationSubmenuItem } from '../../model/navigation.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStore } from '../navigation/navigation.store';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingStore } from '../../../listing/store/listing.store';
import { IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'hoof-search-filters',
  imports: [IonSelect, IonSelectOption, FormsModule],
  templateUrl: './search-filters.component.html',
})
export class SearchFiltersComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private navigation = inject(NavigationStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public store = inject(ListingStore);

  mainCategories: INavigationSubmenuColumn[] = [];
  subcategories: INavigationSubmenuItem[] = [];

  selectedMainCategory: INavigationSubmenuColumn | null = null;
  selectedSubcategory: INavigationSubmenuItem | null = null;

  private _priceFrom: number | null = null;
  private _priceTo: number | null = null;

  ngOnInit() {
    this.mainCategories = this.navigation.getMainCategories();

    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => this.syncRouteToFilters(params));
  }

  private syncRouteToFilters(params: Record<string, string>) {
    const mainSlug = params['mainCat'];
    const subSlug = params['subCat'];

    const mainCol = this.mainCategories.find(c => c.slug === mainSlug) ?? null;
    this.selectedMainCategory = mainCol;
    this.subcategories = mainCol?.items ?? [];

    if (mainCol) {
      this.store.setCategory(mainCol.slug);
    }

    if (subSlug && mainCol) {
      const sub = mainCol.items.find(i => i.slug === subSlug) ?? null;
      this.selectedSubcategory = sub;
      if (sub) {
        this.store.setSubCategory(sub.slug);
      }
    }

    this.store.searchListings();
  }

  onMainCategoryChange(slug: string) {
    const cat = this.mainCategories.find(c => c.slug === slug) ?? null;
    this.selectedMainCategory = cat;
    this.subcategories = cat?.items ?? [];
    this.selectedSubcategory = null;

    this.store.setCategory(cat?.slug ?? null);
    this.store.setSubCategory(null);

    this.router.navigate(['/listing', slug]);
  }

  onSubcategoryChange(subSlug: string) {
    const sub = this.subcategories.find(i => i.slug === subSlug) ?? null;
    this.selectedSubcategory = sub;

    this.store.setSubCategory(sub?.slug ?? null);

    this.router.navigate(['/listing', this.selectedMainCategory!.slug, subSlug], {
      replaceUrl: true,
    });
  }

  get priceFrom(): number | null {
    return this._priceFrom;
  }

  set priceFrom(value: number | null) {
    this._priceFrom = value;
    this.store.setPriceFrom(value);
  }

  get priceTo(): number | null {
    return this._priceTo;
  }

  set priceTo(value: number | null) {
    this._priceTo = value;
    this.store.setPriceTo(value);
  }
}
