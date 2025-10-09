import { Component, inject, Input } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { AccordionComponent } from '../../../shared/components/accordion/accordion.component';
import { SubMenuComponent } from '../sub-menu/sub-menu.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListingFiltersFacadeService } from '../../services/listing-filters-facade.service';
import { IonIcon } from '@ionic/angular/standalone';
import { AuthService } from '../../../login/services/auth.service';

@Component({
  selector: 'hoof-navigation',
  imports: [AccordionComponent, SubMenuComponent, RouterLink, CommonModule, IonIcon],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  @Input() contrast = false;
  readonly navigation = inject(NavigationService);
  protected filtersFacade = inject(ListingFiltersFacadeService);
  protected auth = inject(AuthService);
}
