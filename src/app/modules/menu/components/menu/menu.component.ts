import { MenuItem } from 'src/app/interfaces/models/menu/menu-item';
import { MenuService } from 'src/app/services/menu/menu.service';

import { ChangeDetectionStrategy, Component, OnInit, WritableSignal } from '@angular/core';
import { MenuState } from 'src/app/state/menu.state';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
   selector: 'app-menu',
   templateUrl: './menu.component.html',
   styleUrls: ['./menu.component.scss'],
   standalone: true,
   imports: [
      MatButtonModule,
      MatMenuModule,
      MatIconModule,
      MenuItemComponent,
   ],
   providers: [MenuService],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
   public items: WritableSignal<ReadonlyArray<MenuItem>> = MenuState.items;

   constructor(private readonly _service: MenuService) { }

   ngOnInit(): void {
      this.loadData();
   }

   private loadData(): void {
      this._service.getMenu();
   }
}
