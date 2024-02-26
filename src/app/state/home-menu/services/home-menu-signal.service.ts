import { MenuItem } from 'src/app/interfaces/models/menu/menu-item';
import { HomeMenuService } from 'src/app/services/home-menu/home-menu.service';

import { Injectable } from '@angular/core';

import { homeMenuSignals } from '../home-menu.signals';

@Injectable()
export class HomeMenuSignalService
{
   constructor(private readonly _service: HomeMenuService) { }
   fetchMenu(): void
   {
      const menu = homeMenuSignals().items();

      if (menu.length === 0)
         this._service.dispatch(this._service.methods.getHomeMenu)
            .subscribe((items: Array<MenuItem>) => homeMenuSignals().items.set(items));
   }
}
