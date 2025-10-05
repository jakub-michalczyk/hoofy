import { Component, HostListener, Input, inject } from '@angular/core';
import { ESortingOptions } from '../../../listing/components/sort-options/sort-options.model';
import { SearchFiltersComponent } from '../../../core/components/search-filters/search-filters.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon } from '@ionic/angular/standalone';
import { ListingFiltersFacadeService } from '../../../core/services/listing-filters-facade.service';
import { SearchLocationComponent } from '../../../core/components/search-location/search-location.component';

@Component({
  selector: 'hoof-hero',
  templateUrl: './hero.component.html',
  imports: [SearchFiltersComponent, CommonModule, IonIcon, FormsModule, SearchLocationComponent],
})
export class HeroComponent {
  @Input() bgImage = 'homepage_bg';
  @Input() mode: 'home' | 'listing' | 'map' = 'home';

  facade = inject(ListingFiltersFacadeService);

  mainCategories = this.facade.mainCategories;
  subcategories = this.facade.subcategories;
  selectedSub = this.facade.selectedSub;

  searchTerm = this.facade.searchTerm;
  priceFrom = this.facade.priceFrom;
  priceTo = this.facade.priceTo;
  sorting = this.facade.sorting;

  sortingOptions = Object.values(ESortingOptions) as ESortingOptions[];

  onSearch(): void {
    this.facade.onSearch();
    this.facade.navigateToListing();
  }

  onSortingChange(sort: ESortingOptions): void {
    this.facade.onSortingChange(sort);
  }

  toggleCategory(slug: string): void {
    return this.facade.selectedMain()?.slug === slug
      ? this.facade.onMainCategoryChange('', false)
      : this.facade.onMainCategoryChange(slug, false);
  }

  @HostListener('document:click', ['$event'])
  clearSuggestions(event: MouseEvent): void {
    const tgt = event.target as HTMLElement;
    if (!tgt.closest('input') && !tgt.closest('ul')) {
      this.facade.clearSuggestions();
    }
  }

  get isHomepage() {
    return this.mode !== 'listing' && this.mode !== 'map';
  }
}
