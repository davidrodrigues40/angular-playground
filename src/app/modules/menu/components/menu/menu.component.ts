import { MenuService } from 'src/app/services/menu/menu.service';
import { MenuItem } from 'src/app/state/menu/models/menu-item';
import { MenuSignalService } from 'src/app/state/menu/service/menu-signal.service';

import { Component, effect } from '@angular/core';

@Component({
   selector: 'app-menu',
   templateUrl: './menu.component.html',
   styleUrls: ['./menu.component.scss'],
   providers: [MenuSignalService, MenuService]
})
export class MenuComponent
{
   public items: ReadonlyArray<MenuItem> = this._service.observables.menu;

   constructor(private readonly _service: MenuSignalService)
   {
      this.loadMenu();
   }

   private loadMenu(): void
   {
      effect(() =>
      {
         this.items = this._service.observables.menu;
      });

      this._service.events.fetchMenu();
   }
}
