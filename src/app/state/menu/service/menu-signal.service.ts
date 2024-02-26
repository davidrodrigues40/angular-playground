import { MenuService } from 'src/app/services/menu/menu.service';

import { Injectable } from '@angular/core';

import { MenuItem } from '../../../interfaces/models/menu/menu-item';
import { menuSignals } from '../menu.signals';

@Injectable()
export class MenuSignalService
{
   constructor(private readonly _service: MenuService) { }
   fetchMenu(): void
   {
      const menu = menuSignals().items();
      if (menu.length === 0)
         this._service.dispatch(this._service.methods.getMenu)
            .subscribe((items: MenuItem[]) => menuSignals().items.set(items));
   }
}
