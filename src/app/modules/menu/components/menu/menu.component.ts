import { MenuItem } from 'src/app/interfaces/models/menu/menu-item';
import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { MenuService } from 'src/app/services/menu/menu.service';
import { MenuSignalService } from 'src/app/state/menu/service/menu-signal.service';

import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-menu',
   templateUrl: './menu.component.html',
   styleUrls: ['./menu.component.scss'],
   providers: [MenuSignalService, MenuService]
})
export class MenuComponent implements OnInit
{
   public items: SignalObject<ReadonlyArray<MenuItem>> = { value: this._service.observables.menu };

   constructor(private readonly _service: MenuSignalService)
   {
      this._service.effects.bindMenu(this.items);
   }

   ngOnInit(): void
   {
      this.loadData();
   }

   private loadData(): void
   {
      this._service.events.fetchMenu();
   }
}
