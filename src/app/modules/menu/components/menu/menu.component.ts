import { MenuItem } from 'src/app/interfaces/models/menu/menu-item';
import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { MenuService } from 'src/app/services/menu/menu.service';
import { MenuSignalService } from 'src/app/state/menu/service/menu-signal.service';

import { ChangeDetectionStrategy, Component, OnInit, WritableSignal } from '@angular/core';
import { menuSignals } from 'src/app/state/menu/menu.signals';

@Component({
   selector: 'app-menu',
   templateUrl: './menu.component.html',
   styleUrls: ['./menu.component.scss'],
   providers: [MenuSignalService, MenuService],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit
{
   public items: WritableSignal<ReadonlyArray<MenuItem>> = menuSignals().items;

   constructor(private readonly _service: MenuSignalService)
   {

   }

   ngOnInit(): void
   {
      this.loadData();
   }

   private loadData(): void
   {
      this._service.fetchMenu();
   }
}
