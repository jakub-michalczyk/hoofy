import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { HeroStore } from './hero.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hoof-hero',
  imports: [IonIcon, IonButton, FormsModule, CommonModule],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  store = inject(HeroStore);
  router = inject(Router);
}
