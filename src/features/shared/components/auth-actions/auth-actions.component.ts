import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'hoof-auth-actions',
  imports: [IonButton, RouterLink],
  templateUrl: './auth-actions.component.html',
})
export class AuthActionsComponent {}
