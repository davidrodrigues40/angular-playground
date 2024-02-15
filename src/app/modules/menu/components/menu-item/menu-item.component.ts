import { MenuItem } from 'src/app/interfaces/models/menu/menu-item';

import { Component, Input } from '@angular/core';

@Component({
   selector: 'app-menu-item',
   templateUrl: './menu-item.component.html'
})
export class MenuItemComponent
{
   @Input() item: MenuItem = {
      value: '',
      route: ''
   };
}
