import { Component, HostListener, Input, inject } from '@angular/core';
import { ESortingOptions } from '../../../listing/components/sort-options/sort-options.model';
import { SearchFiltersComponent } from '../../../core/components/search-filters/search-filters.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon } from '@ionic/angular/standalone';
import { ListingFiltersFacadeService } from '../../../core/services/listing-filters-facade.service';

@Component({
  selector: 'hoof-hero',
  templateUrl: './hero.component.html',
  imports: [SearchFiltersComponent, CommonModule, IonIcon, FormsModule],
})
export class HeroComponent {
  @Input() bgImage = 'homepage_bg';
  @Input() isListing = false;

  facade = inject(ListingFiltersFacadeService);

  mainCategories = this.facade.mainCategories;
  subcategories = this.facade.subcategories;
  selectedMain = this.facade.selectedMain;
  selectedSub = this.facade.selectedSub;

  searchTerm = this.facade.searchTerm;
  cityTerm = this.facade.cityTerm;
  priceFrom = this.facade.priceFrom;
  priceTo = this.facade.priceTo;
  sorting = this.facade.sorting;
  citySuggestions = this.facade.citySuggestions;

  sortingOptions = Object.values(ESortingOptions) as ESortingOptions[];

  onSearch(): void {
    this.facade.onSearch();
  }

  onSortingChange(sort: ESortingOptions): void {
    this.facade.onSortingChange(sort);
  }

  onCityInput(): void {
    const term = this.cityTerm();
    this.facade.onCityInput(term);
  }

  selectCity(city: string | null): void {
    this.facade.selectCity(city);
  }

  toggleCategory(slug: string): void {
    this.facade.onMainCategoryChange(slug, false);
  }

  selectSubcategory(slug: string): void {
    this.facade.onSubcategoryChange(slug);
  }

  @HostListener('document:click', ['$event'])
  clearSuggestions(event: MouseEvent): void {
    const tgt = event.target as HTMLElement;
    if (!tgt.closest('input') && !tgt.closest('ul')) {
      this.facade.clearSuggestions();
    }
  }
}
