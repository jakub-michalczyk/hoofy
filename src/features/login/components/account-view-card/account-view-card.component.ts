import { Component, Input } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'hoof-account-view-card',
  imports: [IonButton],
  templateUrl: './account-view-card.component.html',
})
export class AccountViewCardComponent {
  @Input() title = '';
}
