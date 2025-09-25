import { Component } from '@angular/core';
import { ProfilePictureComponent } from '../../../shared/components/profile-picture/profile-picture.component';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { AccountViewDataComponent } from '../account-view-data/account-view-data.component';
import { AccountViewListingsComponent } from '../account-view-listings/account-view-listings.component';

@Component({
  selector: 'hoof-account-view',
  imports: [
    ProfilePictureComponent,
    IonButton,
    IonIcon,
    ProfilePictureComponent,
    AccountViewDataComponent,
    AccountViewListingsComponent,
  ],
  templateUrl: './account-view.component.html',
})
export class AccountViewComponent {}
