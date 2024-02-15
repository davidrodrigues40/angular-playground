import { Observable, first, of } from 'rxjs';
import { HttpSignalService } from 'src/app/interfaces/abstracts/http-signal-service.abstract';
import { MenuItem } from 'src/app/interfaces/models/menu/menu-item';
import { ISignalService } from 'src/app/interfaces/services/signal-service.interface';

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

   private getMenu(): Observable<Array<MenuItem>>
   {
      const _menuItems: MenuItem[] = [
         { value: 'Home', route: '/home' },
         { value: 'Books', route: '/books' },
         { value: 'Bowling', route: '/bowling' },
         { value: 'Chuck Norris Facts', route: '/chuck-norris-facts' },
      ];

      return of(_menuItems)
         .pipe(first())
   }
}
