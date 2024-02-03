import { ISignalStateService } from 'src/app/interfaces/services/signal-state-service.interface';
import { MenuService } from 'src/app/services/menu/menu.service';

import { Injectable } from '@angular/core';

import { menuSignals } from '../menu.signals';
import { MenuItem } from '../models/menu-item';

@Injectable()
export class MenuSignalService implements ISignalStateService
{

   constructor(private readonly _service: MenuService) { }

   events = {
      _service: this._service,
      _menuItems: menuSignals().items(),
      fetchMenu(): void
      {
         console.log('menu items', this._menuItems);
         if (this._menuItems.length === 0)
            this._service.dispatch(this._service.methods.getMenu);
      }
   };
   observables = {
      get menu(): ReadonlyArray<MenuItem> { return menuSignals().items() }
   };
}
