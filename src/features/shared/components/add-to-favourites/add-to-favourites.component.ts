import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'hoof-add-to-favourites',
  imports: [IonIcon, CommonModule],
  templateUrl: './add-to-favourites.component.html',
})
export class AddToFavouritesComponent {
  @Input() contrast = false;
  protected added = signal(false);

  onChange() {
    this.added.set(!this.added());
  }
}
