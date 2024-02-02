import { homeMenuSignals } from 'src/app/state/home-menu/home-menu.signals';

import { Injectable } from '@angular/core';

import { ISignalService } from '../../interfaces/services/signal-service.interface';

@Injectable()
export class HomeMenuService implements ISignalService
{
   constructor() { }

   private _getHomeMenu(): void
   {
      homeMenuSignals().signal.set([
         {
            value: 'NGRX',
            route: 'home/ngrx'
         },
         {
            value: 'Data Flow',
            route: 'home/dataflow'
         }]);
   }

   private readonly _methods: { [k: string]: Function } = {
      getHomeMenu: this._getHomeMenu
   };


   private getMenuFromApi(): void
   {

   }

   dispatch(name: string): void
   {
      if (this._methods[name])
         this._methods[name]();
   }
}
