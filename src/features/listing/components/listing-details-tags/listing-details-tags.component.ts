import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';

import { IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { IListingItem, ITag } from '../listing-item/listing-item.model';
import { ListingTagsService } from '../../services/listing-tags.service';

@Component({
  selector: 'hoof-listing-details-tags',
  imports: [IonIcon, CommonModule],
  templateUrl: './listing-details-tags.component.html',
})
export class ListingDetailsTagsComponent implements OnChanges {
  @Input() data: IListingItem = {} as IListingItem;
  protected tags: ITag[] = [];
  private listingTags = inject(ListingTagsService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.tags = this.listingTags.buildTags(this.data.details);
    }
  }
}
