import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { ISignalStateService } from 'src/app/interfaces/services/signal-state-service.interface';
import { HomeMenuService } from 'src/app/services/home-menu/home-menu.service';
import { MenuItem } from 'src/app/state/menu/models/menu-item';

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
   events = {
      _service: this._service,
      _menuItems: homeMenuSignals().items(),
      fetchMenu(): void
      {
         if (this._menuItems.length === 0)
            this._service.dispatch(this._service.methods.getHomeMenu);
      }
   };
   observables = {
      get menu(): Array<MenuItem> { return homeMenuSignals().items() }
   };
}
