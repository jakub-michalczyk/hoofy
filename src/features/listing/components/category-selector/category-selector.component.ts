import { Component, inject, Input } from '@angular/core';
import { IonButton, IonIcon, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { ListingFiltersFacadeService } from '../../../core/services/listing-filters-facade.service';
import { INavigationSubmenuColumn } from '../../../core/model/navigation.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hoof-category-selector',
  imports: [IonSelect, IonSelectOption, IonIcon, IonButton, CommonModule],
  templateUrl: './category-selector.component.html',
})
export class CategorySelectorComponent {
  @Input() contrast = false;
  @Input() navigateOnChange = false;
  facade = inject(ListingFiltersFacadeService);

  mainCategories = this.facade.mainCategories as () => INavigationSubmenuColumn[];
  subcategories = this.facade.subcategories;

  onMainCategoryChange(slug: string): void {
    this.facade.onMainCategoryChange(slug, this.navigateOnChange);
  }

  onSubcategoryChange(slug: string): void {
    this.facade.onSubcategoryChange(slug, this.navigateOnChange);
  }
}
