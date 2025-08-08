import { Component, DestroyRef, inject } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';
import { SubMenuComponent } from '../sub-menu/sub-menu.component';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { AuthActionsComponent } from '../../../shared/components/auth-actions/auth-actions.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../login/services/auth.service';
import { IonIcon, IonPopover } from '@ionic/angular/standalone';

@Component({
  selector: 'hoof-top-bar',
  imports: [
    NavigationComponent,
    CommonModule,
    SubMenuComponent,
    LogoComponent,
    AuthActionsComponent,
    IonIcon,
    IonPopover,
  ],
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
  readonly navigation = inject(NavigationService);
  private readonly router = inject(Router);
  private readonly contrastPaths: string[] = ['/', '/login', '/register'];
  private destroyerRef = inject(DestroyRef);
  protected auth = inject(AuthService);

  contrast = false;

  constructor() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyerRef)
      )
      .subscribe((event: NavigationEnd) => {
        this.contrast = this.contrastPaths.includes(event.urlAfterRedirects);
      });
  }
}
