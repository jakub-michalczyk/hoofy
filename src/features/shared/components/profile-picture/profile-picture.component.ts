import { Component, computed, inject } from '@angular/core';

import { IonIcon, IonPopover } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ACCOUNT_MENU } from '../../../core/components/navigation/navigation.data';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'hoof-profile-picture',
  imports: [IonIcon, RouterLink, IonPopover, CommonModule],
  templateUrl: './profile-picture.component.html',
})
export class ProfilePictureComponent {
  private auth = inject(AuthService);
  readonly defaultAvatar = '/assets/images/default_avatar.png';
  protected ACCOUNT_MENU = ACCOUNT_MENU;

  readonly photoUrl = computed(() => {
    const user = this.auth.user();
    return user?.profileImg ?? this.defaultAvatar;
  });

  protected isAccountView = false;

  logout() {
    this.auth.logout();
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img && img.src !== this.defaultAvatar) {
      img.src = this.defaultAvatar;
    }
  }
}
