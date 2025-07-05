import { Component, DestroyRef, inject } from '@angular/core';
import { TopBarComponent } from '../core/components/top-bar/top-bar.component';
import { OffCanvasComponent } from '../core/components/off-canvas/off-canvas.component';
import { NavigationService } from '../core/services/navigation.service';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { chevronDown, chevronUp } from 'ionicons/icons';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'hoof-root',
  imports: [TopBarComponent, OffCanvasComponent, CommonModule],
  templateUrl: './hoof.component.html',
})
export class AppComponent {
  navigation = inject(NavigationService);
  breakpointObserver = inject(BreakpointObserver);
  private destroyerRef = inject(DestroyRef);

  constructor() {
    this.registerIcons();
    this.initResizeObserver();
  }

  registerIcons() {
    addIcons({
      'chevron-down-outline': chevronDown,
      'chevron-up-outline': chevronUp,
    });
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
