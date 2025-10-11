import { Component, inject, Input } from '@angular/core';
import { ListingFiltersFacadeService } from '../../services/listing-filters-facade.service';
import { IonIcon } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hoof-search-location',
  imports: [IonIcon, FormsModule, CommonModule],
  templateUrl: './search-location.component.html',
})
export class SearchLocationComponent {
  @Input() rounded = true;
  private facade = inject(ListingFiltersFacadeService);
  protected cityTerm = this.facade.cityTerm;
  protected citySuggestions = this.facade.citySuggestions;

  onCityInput(event: Event): void {
    event.preventDefault();

    const term = this.cityTerm();
    this.facade.onCityInput(term);
  }

  selectCity(event: Event, city: string | null): void {
    event.preventDefault();
    this.facade.selectCity(city);
  }
}
