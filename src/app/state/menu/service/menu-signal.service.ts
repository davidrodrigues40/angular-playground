import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { ISignalStateService } from 'src/app/interfaces/services/signal-state-service.interface';
import { MenuService } from 'src/app/services/menu/menu.service';

import { effect, Injectable } from '@angular/core';

import { MenuItem } from '../../../interfaces/models/menu/menu-item';
import { menuSignals } from '../menu.signals';

@Injectable()
export class MenuSignalService implements ISignalStateService
{
   constructor(private readonly _service: MenuService) { }
   effects = {
      bindMenu(obj: SignalObject<ReadonlyArray<MenuItem>>): void
      {
         effect(() =>
         {
            obj.value = menuSignals().items();
         });
      }
   };
   events = {
      _service: this._service,
      _menuItems: menuSignals().items(),
      fetchMenu(): void
      {
         if (this._menuItems.length === 0)
            this._service.dispatch(this._service.methods.getMenu);
      }
   };
   observables = {
      get menu(): ReadonlyArray<MenuItem> { return menuSignals().items() }
   };
}
