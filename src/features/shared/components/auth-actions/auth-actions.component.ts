import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'hoof-auth-actions',
  imports: [IonButton, RouterLink, CommonModule],
  templateUrl: './auth-actions.component.html',
})
export class AuthActionsComponent {
  @Input() contrast = false;
}
