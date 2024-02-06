import { ISignalService } from 'src/app/interfaces/services/signal-service.interface';
import { homeMenuSignals } from 'src/app/state/home-menu/home-menu.signals';

import { Injectable } from '@angular/core';

@Injectable()
export class HomeMenuService implements ISignalService
{
   methods: {
      getHomeMenu: string;
   } = {
         getHomeMenu: 'getHomeMenu'
      };

   private readonly _methods: { [k: string]: Function } = {
      getHomeMenu: this._getHomeMenu
   };

   readonly details = {
      methods: this._methods
   };

   private _getHomeMenu(): void
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

   dispatch(name: string): any
   {
      if (this._methods[name])
         this._methods[name]();
   }
}
