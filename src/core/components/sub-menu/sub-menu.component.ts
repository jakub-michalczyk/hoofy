import { Component, inject } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hoof-sub-menu',
  imports: [RouterLink, CommonModule],
  templateUrl: './sub-menu.component.html',
})
export class SubMenuComponent {
  nav = inject(NavigationService);
}
