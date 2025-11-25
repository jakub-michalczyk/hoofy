import { Component, Input } from '@angular/core';
import { EListingItemView } from '../../../listing/components/listing-item/listing-item.model';

@Component({
  selector: 'hoof-title',
  imports: [],
  templateUrl: './title.component.html',
})
export class TitleComponent {
  @Input() title = 'Listing Title';
  @Input() view: EListingItemView = EListingItemView.SIMPLE;
  MAX_TITLE_LENGTH = 64;
  protected EListingItemView = EListingItemView;

  get trimmedTitle(): string {
    return this.title.length > this.MAX_TITLE_LENGTH
      ? this.title.slice(0, this.MAX_TITLE_LENGTH) + '...'
      : this.title;
  }
}
