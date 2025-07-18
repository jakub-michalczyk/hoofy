import { Component, inject } from '@angular/core';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { NavigationService } from '../../services/navigation.service';
import { RouterLink } from '@angular/router';
import { SOCIALS } from './footer.data';

@Component({
  selector: 'hoof-footer',
  imports: [LogoComponent, IonButton, IonIcon, RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  socials = SOCIALS;
  year = new Date().getFullYear();
  navigation = inject(NavigationService);
}
