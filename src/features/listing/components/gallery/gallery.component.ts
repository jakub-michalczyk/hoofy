import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  signal,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IonIcon } from '@ionic/angular/standalone';
import { debounceTime, fromEvent } from 'rxjs';
import { SwiperContainer } from 'swiper/element';
import { Swiper, SwiperOptions } from 'swiper/types';

type SwiperElement = SwiperContainer & { swiper: Swiper };

@Component({
  selector: 'hoof-gallery',
  imports: [IonIcon, CommonModule],
  templateUrl: './gallery.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GalleryComponent implements AfterViewInit {
  @Input() images: string[] = [];

  @ViewChild('swiper', { static: true })
  swiperRef!: ElementRef<SwiperElement>;

  @ViewChild('swiperThumbs', { static: true })
  swiperThumbsRef!: ElementRef<SwiperElement>;

  @ViewChild('swiperLightbox', { static: true })
  swiperLightboxRef!: ElementRef<SwiperElement>;

  protected activeIndex = signal(0);
  protected lightBoxActive = signal(false);

  private thumbsSwiper?: Swiper;
  private lightboxInitialized = false;
  private destroyerRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    this.initSwipers();
    this.updateThumbsPerView();

    fromEvent(window, 'resize')
      .pipe(debounceTime(200), takeUntilDestroyed(this.destroyerRef))
      .subscribe(() => {
        this.updateThumbsPerView();
      });
  }

  initSwipers() {
    this.initSwiperContainer(
      this.swiperThumbsRef.nativeElement,
      {
        slidesPerView: 3,
        spaceBetween: 16,
        watchSlidesProgress: true,
        breakpoints: {
          768: {
            slidesPerView: 5,
          },
        },
      },

      swiper => (this.thumbsSwiper = swiper)
    );

    if (this.thumbsSwiper) {
      this.initSwiperContainer(this.swiperRef.nativeElement, {
        ...this.getCreativeConfig(),
        thumbs: { swiper: this.thumbsSwiper },
        navigation: {
          nextEl: '._button-next',
          prevEl: '._button-prev',
        },
      });
    }

    this.initSwiperContainer(
      this.swiperLightboxRef.nativeElement,
      {
        ...this.getCreativeConfig(),
        thumbs: { swiper: this.thumbsSwiper! },
        navigation: {
          nextEl: '._button-next-lightbox',
          prevEl: '._button-prev-lightbox',
        },
      },
      sw => {
        sw.slideTo(this.activeIndex());
        this.lightboxInitialized = true;
      }
    );
  }

  toggleLightbox() {
    this.lightBoxActive.update(v => !v);

    if (this.lightBoxActive() && this.lightboxInitialized) {
      const lightSwiper = this.swiperLightboxRef.nativeElement.swiper;
      lightSwiper.update();
      lightSwiper.slideTo(this.activeIndex());
    }
  }

  closeLightboxOnBackdrop() {
    this.lightBoxActive.set(false);
  }

  private updateThumbsPerView() {
    const spv = window.innerWidth >= 768 ? 5 : 3;
    if (this.thumbsSwiper) {
      this.thumbsSwiper.params.slidesPerView = spv;
      this.thumbsSwiper.update();
    }
  }

  private getCreativeConfig(): SwiperOptions {
    return {
      slidesPerView: 1,
      grabCursor: true,
      effect: 'creative',
      creativeEffect: {
        prev: { shadow: true, translate: [0, 0, -400] },
        next: { translate: ['100%', 0, 0] },
      },
      on: {
        slideChange: (sw: Swiper) => this.activeIndex.set(sw.activeIndex),
      },
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
    };
  }

  private initSwiperContainer(
    el: SwiperElement,
    opts: Partial<SwiperOptions>,
    afterInit?: (swiper: Swiper) => void
  ) {
    Object.assign(el, opts);
    el.initialize();
    if (afterInit) {
      afterInit(el.swiper);
    }
  }
}
