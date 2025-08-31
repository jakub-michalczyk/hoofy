import { Component, inject } from '@angular/core';
import { ProfilePictureComponent } from '../../../shared/components/profile-picture/profile-picture.component';
import { AuthService } from '../../services/auth.service';
import { AccountBannerComponent } from '../account-banner/account-banner.component';

@Component({
  selector: 'hoof-account-view',
  imports: [ProfilePictureComponent, AccountBannerComponent],
  templateUrl: './account-view.component.html',
})
export class AccountViewComponent {
  auth = inject(AuthService);
}
