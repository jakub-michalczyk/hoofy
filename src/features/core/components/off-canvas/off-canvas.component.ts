import { Component, inject } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { AuthActionsComponent } from '../../../shared/components/auth-actions/auth-actions.component';
import { NavigationService } from '../../services/navigation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hoof-off-canvas',
  imports: [NavigationComponent, LogoComponent, AuthActionsComponent, CommonModule],
  templateUrl: './off-canvas.component.html',
})
export class OffCanvasComponent {
  navigation = inject(NavigationService);
}
