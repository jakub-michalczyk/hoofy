import { Component, signal } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'hoof-add-to-favourites',
  imports: [IonIcon],
  templateUrl: './add-to-favourites.component.html',
})
export class AddToFavouritesComponent {
  added = signal(false);

  onChange() {
    this.added.set(!this.added());
  }
}
