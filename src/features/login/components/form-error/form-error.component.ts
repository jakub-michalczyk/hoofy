import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'hoof-form-error',
  imports: [IonIcon],
  templateUrl: './form-error.component.html',
})
export class FormErrorComponent {
  @Input() errorMessage = '';
}
