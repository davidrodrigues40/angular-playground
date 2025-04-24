import { MenuItem } from 'src/app/interfaces/models/menu/menu-item';

import { Injectable } from '@angular/core';
import { MenuState } from 'src/app/state/menu.state';

@Injectable()
export class MenuService {
   private readonly _menuItems: MenuItem[] = [
      { value: 'Home', route: '/home' },
      { value: 'Books', route: '/books' },
      { value: 'Bowling', route: '/bowling' },
      { value: 'Chuck Norris Facts', route: '/chuck-norris-facts' },
      { value: 'Calculator', route: '/calculator' },
   ];

   getMenu(): void {
      MenuState.items.set(this._menuItems);
   }
}
