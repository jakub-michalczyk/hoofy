import { Component, inject, Input } from '@angular/core';
import { ListingStore } from '../../store/listing.store';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroComponent } from '../../../homepage/components/hero/hero.component';
import { ListingItemComponent } from '../listing-item/listing-item.component';
import { SortOptionsComponent } from '../sort-options/sort-options.component';
import { EGridMode } from '../sort-options/sort-options.model';
import { PaginationComponent } from '../pagination/pagination.component';
import { DetailsFilterComponent } from '../details-filter/details-filter.component';
import { MapComponent } from '../../../map/components/map/map.component';
import { IonButton } from '@ionic/angular/standalone';
import { ListingFiltersFacadeService } from '../../../core/services/listing-filters-facade.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'hoof-listing',
  imports: [
    CommonModule,
    ListingItemComponent,
    FormsModule,
    ReactiveFormsModule,
    ListingItemComponent,
    HeroComponent,
    SortOptionsComponent,
    PaginationComponent,
    DetailsFilterComponent,
    MapComponent,
    RouterLink,
    IonButton,
  ],
  templateUrl: './listing.component.html',
})
export class ListingComponent {
  @Input() mapContainer = false;
  protected store = inject(ListingStore);
  facade = inject(ListingFiltersFacadeService);
  EGridMode = EGridMode;
}
