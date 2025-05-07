import { MenuItem } from 'src/app/interfaces/models/menu/menu-item';

import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({
   selector: 'app-menu-item',
   templateUrl: './menu-item.component.html',
   standalone: true,
   imports: [
      RouterModule,
      MatMenuModule
   ]
})
export class MenuItemComponent {
   @Input() item: MenuItem = {
      value: '',
      route: ''
   };
}
