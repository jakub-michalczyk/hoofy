import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  Signal,
  signal,
  ViewChild,
  ElementRef,
  AfterViewInit,
  effect,
} from '@angular/core';
import { SwiperContainer } from 'swiper/element';

import { CommonModule } from '@angular/common';
import { ListingItemComponent } from '../../../listing/components/listing-item/listing-item.component';
import {
  EListingItemView,
  IListingItem,
} from '../../../listing/components/listing-item/listing-item.model';

@Component({
  selector: 'hoof-carousel',
  standalone: true,
  imports: [ListingItemComponent, CommonModule],
  templateUrl: './carousel.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent implements AfterViewInit {
  @Input() carouselTitle = 'Title';
  @Input() slides: Signal<IListingItem[]> = signal([]);
  @Input() hasPagination = false;
  @ViewChild('swiper') swiperRef?: ElementRef<SwiperContainer>;
  protected showPagination = signal(false);

  protected EListingItemView = EListingItemView;

  constructor() {
    effect(() => {
      if (this.slides().length > 6) {
        this.showPagination.update(() => true);
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.swiperRef?.nativeElement) {
      this.initSwiper(this.swiperRef?.nativeElement);
    }
  }

  private initSwiper(swiperEl: SwiperContainer): void {
    Object.assign(swiperEl, {
      slidesPerView: 5,
      pagination: {
        el: '._pagination',
        clickable: true,
        renderBullet: (idx: number, className: string) =>
          `<span class="${className} _bullet"></span>`,
      },
      autoplay: {
        delay: 2500,
      },
      breakpoints: {
        1600: { slidesPerView: 6 },
        830: { slidesPerView: 4 },
        600: { slidesPerView: 3 },
        430: { slidesPerView: 2 },
        0: { slidesPerView: 1 },
      },
    });
    swiperEl.initialize();
  }
}
