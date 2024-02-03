import { HomeMenuService } from 'src/app/services/home-menu/home-menu.service';
import { HomeMenuSignalService } from 'src/app/state/home-menu/services/home-menu-signal.service';
import { MenuItem } from 'src/app/state/menu/models/menu-item';

import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
   selector: 'app-home-menu',
   templateUrl: './home-menu.component.html',
   styleUrls: ['./home-menu.component.scss'],
   standalone: true,
   imports: [
      MatButtonModule,
      RouterModule,
      CommonModule
   ],
   providers: [
      HomeMenuSignalService,
      HomeMenuService]
})
export class HomeMenuComponent
{
   menuItems: Array<MenuItem> = [];

   constructor(public readonly router: Router,
      private readonly _stateService: HomeMenuSignalService)
   {
      this.loadMenu();
   }

   markDisabled(route: string): boolean
   {
      return this.router.url === `/${route}`;
   }

   private loadMenu(): void
   {
      effect(() =>
      {
         this.menuItems = this._stateService.observables.menu;
      });

      this._stateService.events.fetchMenu();
   }
}
