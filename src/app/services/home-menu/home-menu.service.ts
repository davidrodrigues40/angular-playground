import { HttpSignalService } from 'src/app/interfaces/abstracts/http-signal-service.abstract';
import { ISignalService } from 'src/app/interfaces/services/signal-service.interface';
import { homeMenuSignals } from 'src/app/state/home-menu/home-menu.signals';

import { Injectable } from '@angular/core';

@Injectable()
export class HomeMenuService extends HttpSignalService implements ISignalService
{
   methods: {
      getHomeMenu: string;
   } = {
         getHomeMenu: 'getHomeMenu'
      };

   private readonly _methods: { [k: string]: Function } = {
      getHomeMenu: this.getHomeMenu
   };

   override readonly details = {
      getHomeMenu: this.getHomeMenu,
      httpClient: undefined,
      base_url: undefined
   }

   private getHomeMenu(): void
   {
      const menuItems = [
         {
            value: 'NGRX',
            route: 'home/ngrx'
         },
         {
            value: 'Data Flow',
            route: 'home/dataflow'
         }];

      homeMenuSignals().items.set(menuItems);
   }
}
