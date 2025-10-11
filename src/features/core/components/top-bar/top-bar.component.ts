import { Component, inject, OnInit } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';
import { SubMenuComponent } from '../sub-menu/sub-menu.component';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { AuthActionsComponent } from '../../../shared/components/auth-actions/auth-actions.component';

import { ProfilePictureComponent } from '../../../shared/components/profile-picture/profile-picture.component';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'hoof-top-bar',
  imports: [
    NavigationComponent,
    CommonModule,
    SubMenuComponent,
    LogoComponent,
    AuthActionsComponent,
    ProfilePictureComponent,
    RouterLink,
  ],
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent implements OnInit {
  readonly navigation = inject(NavigationService);
  protected auth = inject(AuthService);
  protected router = inject(Router);
  private contrastPaths = ['/account', '/chat', '/add-listing'];

  protected contrast = false;

  ngOnInit(): void {
    this.checkForContrastPath();
  }

  checkForContrastPath() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.contrast =
          this.isListingDetailPath(event.urlAfterRedirects) ||
          this.isEditListingPath(event.urlAfterRedirects) ||
          this.contrastPaths.includes(event.urlAfterRedirects);
      }
    });
  }

  private isListingDetailPath(url: string): boolean {
    const regex = /^\/listing\/[^/]+\/[^/]+\/[^/]+$/;
    return regex.test(url);
  }

  private isEditListingPath(url: string): boolean {
    const regex = /^\/edit\/[^/]+$/;
    return regex.test(url);
  }
}
