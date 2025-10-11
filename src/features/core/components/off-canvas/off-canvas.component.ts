import { Component, inject } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { AuthActionsComponent } from '../../../shared/components/auth-actions/auth-actions.component';
import { NavigationService } from '../../services/navigation.service';
import { CommonModule } from '@angular/common';

import { ACCOUNT_MENU } from '../navigation/navigation.data';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'hoof-off-canvas',
  imports: [NavigationComponent, AuthActionsComponent, CommonModule, RouterLink],
  templateUrl: './off-canvas.component.html',
})
export class OffCanvasComponent {
  protected navigation = inject(NavigationService);
  protected auth = inject(AuthService);
  protected ACCOUNT_MENU = ACCOUNT_MENU;
}
