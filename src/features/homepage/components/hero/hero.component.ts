import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { HeroStore } from '../store/hero.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hoof-hero',
  imports: [IonIcon, FormsModule, CommonModule],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  store = inject(HeroStore);
  router = inject(Router);
  @Input() bgImage = 'homepage_bg';
}
