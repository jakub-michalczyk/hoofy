import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CITIES, FOOTER_MENU, SOCIALS } from './footer.data';
import { NavigationService } from '../../services/navigation.service';
import { NewsletterComponent } from '../newsletter/newsletter.component';
import { debounceTime, fromEvent } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hoof-footer',
  imports: [LogoComponent, IonIcon, RouterLink, NewsletterComponent, CommonModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent implements AfterViewInit {
  @ViewChild('footerTop', { static: true })
  private footerTop!: ElementRef<HTMLElement>;
  @ViewChildren('footerItem', { read: ElementRef })
  private footerItems!: QueryList<ElementRef<HTMLElement>>;

  protected navigation = inject(NavigationService);
  protected year = new Date().getFullYear();

  protected socials = SOCIALS;
  protected cities = CITIES;
  protected footerMenu = FOOTER_MENU;

  protected menuWrapped = false;

  ngAfterViewInit(): void {
    this.checkWrap();

    fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => this.checkWrap());
  }

  private checkWrap(): void {
    this.menuWrapped = false;

    requestAnimationFrame(() => {
      const containerEl = this.footerTop.nativeElement;
      const containerWidth = containerEl.clientWidth;

      const style = window.getComputedStyle(containerEl);
      const gap = parseFloat(style.columnGap || '0');

      let sumWidths = 0;
      this.footerItems.forEach(item => {
        sumWidths += item.nativeElement.offsetWidth;
      });

      const total = sumWidths + gap * (this.footerItems.length - 1);
      this.menuWrapped = total > containerWidth;
    });
  }
}
