import { Component, HostListener, inject, Input } from '@angular/core';
import { IonButton, IonIcon, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ESortingOptions } from '../../../listing/components/sort-options/sort-options.model';
import { ListingFiltersFacadeService } from '../../services/listing-filters-facade.service';
import { CommonModule } from '@angular/common';
import { CategorySelectorComponent } from '../../../listing/components/category-selector/category-selector.component';

@Component({
  selector: 'hoof-search-filters',
  imports: [
    IonSelect,
    IonSelectOption,
    FormsModule,
    IonIcon,
    IonButton,
    CommonModule,
    CategorySelectorComponent,
  ],
  templateUrl: './search-filters.component.html',
})
export class SearchFiltersComponent {
  @Input() contrast = false;
  facade = inject(ListingFiltersFacadeService);

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

  onSortingChange(newSort: ESortingOptions): void {
    this.facade.onSortingChange(newSort);
  }

  onCityInput(): void {
    this.facade.onCityInput(this.cityTerm());
  }

  selectCity(city: string | null): void {
    this.facade.selectCity(city);
  }

  onPriceFromChange(value: number | null): void {
    this.facade.priceFrom.set(value);
    this.facade.onSearch();
  }

  onPriceToChange(value: number | null): void {
    this.facade.priceTo.set(value);
    this.facade.onSearch();
  }

  @HostListener('document:click', ['$event'])
  clearSuggestions(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('input') && !target.closest('ul')) {
      this.facade.clearSuggestions();
    }
  }
}
