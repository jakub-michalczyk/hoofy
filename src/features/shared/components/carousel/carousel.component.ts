import {
  AfterViewInit,
  Component,
  ContentChild,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Input,
} from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { ListingItemComponent } from '../listing-item/listing-item.component';

@Component({
  selector: 'hoof-carousel',
  imports: [ListingItemComponent],
  templateUrl: './carousel.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent implements AfterViewInit {
  @Input() carouselTitle = 'Title';
  @Input() slides: unknown[] = [];
  @ContentChild('swiper') swiperRef!: ElementRef<SwiperContainer>;

  ngAfterViewInit() {
    const swiperEl = document.querySelector('swiper-container') as SwiperContainer;

    Object.assign(swiperEl, {
      slidesPerView: 5,
      pagination: {
        el: '._pagination',
        clickable: true,
        renderBullet: (index: number, className: string) => {
          return `<span class="${className} _bullet"></span>`;
        },
      },
      breakpoints: {
        1600: {
          slidesPerView: 5,
        },
        600: {
          slidesPerView: 3,
        },
        430: {
          slidesPerView: 2,
        },
        0: {
          slidesPerView: 1,
        },
      },
    });

    swiperEl.initialize();
  }
}
