import { Component, inject } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { AccordionComponent } from '../../../shared/components/accordion/accordion.component';
import { SubMenuComponent } from '../sub-menu/sub-menu.component';

@Component({
  selector: 'hoof-navigation',
  imports: [AccordionComponent, SubMenuComponent],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  readonly navigation = inject(NavigationService);
}
