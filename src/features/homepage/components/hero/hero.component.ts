import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { NavigationStore } from '../../../core/components/navigation/navigation.store';
import { ListingStore } from '../../../listing/store/listing.store';
import { SearchFiltersComponent } from '../../../core/components/search-filters/search-filters.component';

@Component({
  selector: 'hoof-hero',
  imports: [IonIcon, FormsModule, CommonModule, SearchFiltersComponent],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit {
  @Input() bgImage = 'homepage_bg';
  @Input() isListing = false;
  router = inject(Router);
  store = inject(ListingStore);
  navigation = inject(NavigationStore);

  searchTerm = '';
  cityTerm = '';
  categories = this.navigation.getMainCategories();

  ngOnInit() {
    this.getSearchTerm();
  }

  getSearchTerm() {
    this.searchTerm = this.store.searchTerm();
  }

  onSearch() {
    const activeCategory = this.categories.find(cat => cat.active);
    const commands = ['/listing'];

    if (activeCategory?.slug) {
      commands.push(activeCategory.slug);
    }

    this.store.setSearchTerm(this.searchTerm);
    this.store.searchListings();

    if (!this.router.url.includes('listing')) {
      this.router.navigate(commands);
    }
  }

  toggleCategory(index: number) {
    const selected = this.categories[index];
    this.categories = this.categories.map((cat, i) => ({
      ...cat,
      active: i === index ? !cat.active : false,
    }));

    this.store.setCategory(selected.active ? selected.slug : null);
  }
}
