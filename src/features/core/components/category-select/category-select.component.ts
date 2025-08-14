import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { INavigationSubmenuColumn, INavigationSubmenuItem } from '../../model/navigation.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStore } from '../navigation/navigation.store';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingStore } from '../../../listing/store/listing.store';
import { IonSelect, IonSelectOption } from '@ionic/angular/standalone';

@Component({
  selector: 'hoof-category-select',
  imports: [IonSelect, IonSelectOption],
  templateUrl: './category-select.component.html',
})
export class CategorySelectComponent implements OnInit {
  private destroyerRef = inject(DestroyRef);
  navigation = inject(NavigationStore);
  route = inject(ActivatedRoute);
  router = inject(Router);
  store = inject(ListingStore);

  mainCategories: INavigationSubmenuColumn[] = this.navigation.getMainCategories();
  subcategories: INavigationSubmenuItem[] = [];

  selectedMainCategory: INavigationSubmenuColumn | null = null;
  selectedSubcategory: INavigationSubmenuItem | null = null;

  ngOnInit() {
    this.getCurrentCategory();
  }

  getCurrentCategory() {
    this.route.params.pipe(takeUntilDestroyed(this.destroyerRef)).subscribe(params => {
      const mainSlug = params['mainCat'];
      const subSlug = params['subCat'];

      const allColumns = this.navigation.getMainCategories();
      const mainColumn = allColumns.find(col => col.slug === mainSlug);

      if (mainColumn) {
        this.selectedMainCategory = mainColumn;
        this.subcategories = mainColumn.items;
      }

      const subItem = mainColumn?.items.find(item => item.slug === subSlug);
      if (subItem) {
        this.selectedSubcategory = { text: subItem.text, slug: subItem.slug };
      }
    });
  }

  onMainCategoryChange(slug: string) {
    const category = this.mainCategories.find(cat => cat.slug === slug);
    if (category) {
      this.selectedMainCategory = category;
      this.subcategories = category.items;
      this.selectedSubcategory = null;

      this.router.navigate(['/listing', slug]);
    }
  }

  onSubcategoryChange(subSlug: string) {
    const sub = this.subcategories.find(item => item.slug === subSlug);
    if (sub && this.selectedMainCategory) {
      this.selectedSubcategory = sub;
      this.router.navigate(['/listing', this.selectedMainCategory.slug, sub.slug]);
    }
  }
}
