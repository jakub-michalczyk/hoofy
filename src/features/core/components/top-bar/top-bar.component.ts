import { Component, inject } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';
import { SubMenuComponent } from '../sub-menu/sub-menu.component';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { AuthActionsComponent } from '../../../shared/components/auth-actions/auth-actions.component';
import { AuthService } from '../../../login/services/auth.service';
import { ProfilePictureComponent } from '../../../shared/components/profile-picture/profile-picture.component';

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
export class TopBarComponent {
  readonly navigation = inject(NavigationService);
  protected auth = inject(AuthService);
}
