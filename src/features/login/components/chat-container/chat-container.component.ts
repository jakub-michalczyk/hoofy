import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';
import { ChatStore } from '../../store/chat.store';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AccountBannerComponent } from '../account-banner/account-banner.component';
import { SwiperContainer } from 'swiper/element';

@Component({
  selector: 'hoof-chat-container',
  imports: [FormsModule, CommonModule, IonButton, AccountBannerComponent],
  templateUrl: './chat-container.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatContainerComponent implements AfterViewInit {
  store = inject(ChatStore);
  authService = inject(AuthService);
  @ViewChild('swiper') swiperRef?: ElementRef<SwiperContainer>;

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
      breakpoints: {
        600: { slidesPerView: 5 },
        230: { slidesPerView: 3 },
      },
    });
    swiperEl.initialize();
  }
}
