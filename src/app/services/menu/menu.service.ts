import { first, of } from 'rxjs';
import { ISignalService } from 'src/app/interfaces/services/signal-service.interface';
import { menuSignals } from 'src/app/state/menu/menu.signals';
import { MenuItem } from 'src/app/state/menu/models/menu-item';

import { Injectable } from '@angular/core';

@Injectable()
export class MenuService implements ISignalService
{
   methods: {
      getMenu: string;
   } = {
         getMenu: 'getMenu'
      };

   private readonly _methods: { [k: string]: Function } = {
      getMenu: this._getMenu
   };

   dispatch(name: string): void
   {
      if (this._methods[name])
         this._methods[name]();
   }

   private _getMenu(): void
   {
      const _menuItems: MenuItem[] = [
         { value: 'Home', route: '/home' },
         { value: 'Books', route: '/books' },
         { value: 'Bowling', route: '/bowling' },
         { value: 'Chuck Norris Facts', route: '/chuck-norris-facts' },
      ];

      of(_menuItems)
         .pipe(first())
         .subscribe((items: ReadonlyArray<MenuItem>) => menuSignals().items.set(items));
   }
}
