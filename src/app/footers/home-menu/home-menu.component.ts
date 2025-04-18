import { MenuItem } from 'src/app/interfaces/models/menu/menu-item';

import { CommonModule } from '@angular/common';
import {
   ChangeDetectionStrategy,
   Component,
   EnvironmentInjector,
   inject,
   OnInit,
   WritableSignal
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

import { BaseFooter } from '../base-footer.component';
import { HomeMenuState } from 'src/app/state/home-menu.state';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
   selector: 'app-home-menu',
   templateUrl: './home-menu.component.html',
   styleUrls: ['./home-menu.component.scss'],
   standalone: true,
   imports: [
      MatButtonModule,
      RouterModule,
      CommonModule,
      BaseFooter
   ],
   providers: [
      MenuService],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeMenuComponent implements OnInit {
   private readonly _injector: EnvironmentInjector = inject(EnvironmentInjector);
   menuItems: WritableSignal<Array<MenuItem>> = HomeMenuState.items;

   constructor(public readonly router: Router,
      private readonly _menuService: MenuService) {

   }

   ngOnInit(): void {
      this.loadData();
   }

   markDisabled(route: string): boolean {
      return this.router.url === `/${route}`;
   }

   private loadData(): void {
      this._menuService.getMenu();
   }
}
