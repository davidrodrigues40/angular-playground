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
   methods = {
      _service: this._service,
      fetchMenu(): void
      {
         const menu = menuSignals().items();
         if (menu.length === 0)
            this._service.dispatch(this._service.methods.getMenu)
               .subscribe((items: MenuItem[]) => menuSignals().items.set(items));
      }
   };
   data = {
      get menu(): ReadonlyArray<MenuItem> { return menuSignals().items() }
   };
}
