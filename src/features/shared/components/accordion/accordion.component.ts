import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'hoof-accordion',
  imports: [CommonModule, IonIcon],
  animations: [
    trigger('expandCollapse', [
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
          marginTop: '1.5rem',
          overflow: 'hidden',
        })
      ),
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
          paddingTop: '0px',
          marginTop: '0px',
          overflow: 'hidden',
        })
      ),
      transition('open <=> closed', animate('300ms ease')),
    ]),
  ],
  templateUrl: './accordion.component.html',
})
export class AccordionComponent {
  @Input() title = '';
  open = signal(false);

  toggle() {
    this.open.update(v => !v);
  }
}
