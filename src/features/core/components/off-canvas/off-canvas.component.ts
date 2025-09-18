import { Component, inject } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { AuthActionsComponent } from '../../../shared/components/auth-actions/auth-actions.component';
import { NavigationService } from '../../services/navigation.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../login/services/auth.service';
import { LOGGED_IN_MENU } from '../navigation/navigation.data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'hoof-off-canvas',
  imports: [NavigationComponent, LogoComponent, AuthActionsComponent, CommonModule, RouterLink],
  templateUrl: './off-canvas.component.html',
})
export class OffCanvasComponent {
  navigation = inject(NavigationService);
  auth = inject(AuthService);
  LOGGED_IN_MENU = LOGGED_IN_MENU;
}
