import { Component, Input } from '@angular/core';

@Component({
  selector: 'hoof-logo',
  imports: [],
  templateUrl: './logo.component.html',
})
export class LogoComponent {
  @Input() contrast = false;
}
