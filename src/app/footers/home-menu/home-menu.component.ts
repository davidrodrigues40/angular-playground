import { MenuItem } from 'src/app/interfaces/models/menu/menu-item';
import { HomeMenuService } from 'src/app/services/home-menu/home-menu.service';
import { HomeMenuSignalService } from 'src/app/state/home-menu/services/home-menu-signal.service';

import { CommonModule } from '@angular/common';
import
{
   ChangeDetectionStrategy,
   Component,
   EnvironmentInjector,
   inject,
   OnInit,
   WritableSignal
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

import { homeMenuSignals } from 'src/app/state/home-menu/home-menu.signals';
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
      HomeMenuService],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeMenuComponent implements OnInit   
{
   private readonly _injector: EnvironmentInjector = inject(EnvironmentInjector);
   menuItems: WritableSignal<Array<MenuItem>> = homeMenuSignals().items;

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
      this._stateService.fetchMenu();
   }
}
