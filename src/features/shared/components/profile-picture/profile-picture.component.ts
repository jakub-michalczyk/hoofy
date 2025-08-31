import { Component, inject, Input } from '@angular/core';
import { AuthService } from '../../../login/services/auth.service';
import { IonIcon, IonPopover } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'hoof-profile-picture',
  imports: [IonIcon, RouterLink, IonPopover, CommonModule, NgOptimizedImage],
  templateUrl: './profile-picture.component.html',
})
export class ProfilePictureComponent {
  @Input() isAccountView = false;
  auth = inject(AuthService);
}
