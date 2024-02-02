import { homeMenuSignals } from 'src/app/state/home-menu/home-menu.signals';
import { HomeMenuStateService } from 'src/app/state/home-menu/services/home-menu-state.service';
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
   providers: [HomeMenuStateService]
})
export class HomeMenuComponent
{
   signalMenuItems: ReadonlyArray<MenuItem> = this._stateService.observables.menu;

   constructor(public readonly router: Router,
      private readonly _stateService: HomeMenuStateService)
   {
      effect(() =>
      {
         this.signalMenuItems = homeMenuSignals().signal();
      });

      if (this.signalMenuItems.length === 0)
         this._stateService.events.fetchMenu().emit();
   }

   markDisabled(route: string): boolean
   {
      return this.router.url === `/${route}`;
   }
}
