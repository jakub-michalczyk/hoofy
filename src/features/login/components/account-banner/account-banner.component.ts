import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'hoof-account-banner',
  imports: [IonIcon],
  templateUrl: './account-banner.component.html',
})
export class AccountBannerComponent {
  @Input() isEditMode = false;

  onFileSelected() {
    //
  }
}
