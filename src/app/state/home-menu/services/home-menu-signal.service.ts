import { MenuItem } from 'src/app/interfaces/models/menu/menu-item';
import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { ISignalStateService } from 'src/app/interfaces/services/signal-state-service.interface';
import { HomeMenuService } from 'src/app/services/home-menu/home-menu.service';

import { effect, Injectable } from '@angular/core';

import { homeMenuSignals } from '../home-menu.signals';

@Injectable()
export class HomeMenuSignalService implements ISignalStateService
{
   constructor(private readonly _service: HomeMenuService) { }
   effects = {
      bindMenu(items: SignalObject<ReadonlyArray<MenuItem>>): void
      {
         effect(() =>
         {
            items.value = homeMenuSignals().items();
         });
      }
   };
   methods = {
      _service: this._service,
      fetchMenu(): void
      {
         const menu = homeMenuSignals().items();

         if (menu.length === 0)
            this._service.dispatch(this._service.methods.getHomeMenu)
               .subscribe((items: Array<MenuItem>) => homeMenuSignals().items.set(items));
      }
   };
   data = {
      get menu(): Array<MenuItem> { return homeMenuSignals().items() }
   };
}
