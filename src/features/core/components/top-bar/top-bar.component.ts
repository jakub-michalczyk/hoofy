import { Component, inject, OnInit } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';
import { SubMenuComponent } from '../sub-menu/sub-menu.component';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { AuthActionsComponent } from '../../../shared/components/auth-actions/auth-actions.component';
import { AuthService } from '../../../login/services/auth.service';
import { ProfilePictureComponent } from '../../../shared/components/profile-picture/profile-picture.component';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'hoof-top-bar',
  imports: [
    NavigationComponent,
    CommonModule,
    SubMenuComponent,
    LogoComponent,
    AuthActionsComponent,
    ProfilePictureComponent,
  ],
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent implements OnInit {
  readonly navigation = inject(NavigationService);
  protected auth = inject(AuthService);
  protected router = inject(Router);

  contrast = false;

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.contrast = this.isListingDetailPath(event.urlAfterRedirects);
      }
    });
  }

  private isListingDetailPath(url: string): boolean {
    const regex = /^\/listing\/[^/]+\/[^/]+\/[^/]+$/;
    return regex.test(url);
  }
}
