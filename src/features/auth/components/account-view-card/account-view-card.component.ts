import { Component, Input } from '@angular/core';

@Component({
  selector: 'hoof-account-view-card',
  imports: [],
  templateUrl: './account-view-card.component.html',
})
export class AccountViewCardComponent {
  @Input() title = '';
}
