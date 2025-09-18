import { Component, inject, Input } from '@angular/core';
import { AuthService } from '../../../login/services/auth.service';
import { IonIcon, IonPopover } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LOGGED_IN_MENU } from '../../../core/components/navigation/navigation.data';

@Component({
  selector: 'hoof-profile-picture',
  imports: [IonIcon, RouterLink, IonPopover, CommonModule, NgOptimizedImage],
  templateUrl: './profile-picture.component.html',
})
export class ProfilePictureComponent {
  @Input() isAccountView = false;
  auth = inject(AuthService);
  LOGGED_IN_MENU = LOGGED_IN_MENU;
}
