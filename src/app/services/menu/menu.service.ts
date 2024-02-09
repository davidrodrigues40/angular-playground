import { first, of } from 'rxjs';
import { HttpSignalService } from 'src/app/interfaces/abstracts/http-signal-service.abstract';
import { MenuItem } from 'src/app/interfaces/models/menu/menu-item';
import { ISignalService } from 'src/app/interfaces/services/signal-service.interface';
import { menuSignals } from 'src/app/state/menu/menu.signals';

import { Injectable } from '@angular/core';

@Injectable()
export class MenuService extends HttpSignalService implements ISignalService
{
   methods: {
      getMenu: string;
   } = {
         getMenu: 'getMenu'
      };

   override readonly details = {
      getMenu: this.getMenu,
      httpClient: undefined,
      base_url: ''
   };

   private getMenu(): void
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
