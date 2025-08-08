import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IonContent } from '@ionic/angular/standalone';
import { OffCanvasComponent } from '../features/core/components/off-canvas/off-canvas.component';
import { TopBarComponent } from '../features/core/components/top-bar/top-bar.component';
import { NavigationService } from '../features/core/services/navigation.service';
import { FooterComponent } from '../features/core/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { IconService } from '../features/core/services/icon.service';

@Component({
  selector: 'hoof-root',
  imports: [
    TopBarComponent,
    OffCanvasComponent,
    CommonModule,

    IonContent,

    FooterComponent,
    RouterOutlet,
  ],
  templateUrl: './hoof.component.html',
})
export class AppComponent {
  iconService = inject(IconService);
  navigation = inject(NavigationService);
  breakpointObserver = inject(BreakpointObserver);

  private destroyerRef = inject(DestroyRef);

  constructor() {
    this.iconService.registerIcons();
    this.initResizeObserver();
  }

  initResizeObserver() {
    this.breakpointObserver
      .observe(['(min-width: 1024px)'])
      .pipe(takeUntilDestroyed(this.destroyerRef))
      .subscribe(({ matches }) => {
        if (matches) {
          this.navigation.closeSideMenu();
        }
      });
  }
}
