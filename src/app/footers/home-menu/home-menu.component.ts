import { MenuItem } from 'src/app/interfaces/models/menu/menu-item';
import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { HomeMenuService } from 'src/app/services/home-menu/home-menu.service';
import { HomeMenuSignalService } from 'src/app/state/home-menu/services/home-menu-signal.service';

import { CommonModule } from '@angular/common';
import
{
   Component,
   EnvironmentInjector,
   inject,
   OnInit,
   runInInjectionContext
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

import { BaseFooter } from '../base-footer.component';

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
      HomeMenuSignalService,
      HomeMenuService]
})
export class HomeMenuComponent implements OnInit   
{
   private readonly _injector: EnvironmentInjector = inject(EnvironmentInjector);
   menuItems: SignalObject<Array<MenuItem>> = { value: [] };

   constructor(public readonly router: Router,
      private readonly _stateService: HomeMenuSignalService)
   {

   }

   ngOnInit(): void
   {
      this.loadData();
   }

   markDisabled(route: string): boolean
   {
      return this.router.url === `/${route}`;
   }

   private loadData(): void
   {
      runInInjectionContext(this._injector, () =>
      {
         this._stateService.effects.bindMenu(this.menuItems);
      });
      this._stateService.events.fetchMenu();
   }
}
