import { Injectable } from '@angular/core';
import { MenuState } from 'src/app/state/menu.state';

@Injectable()
export class HomeMenuService {
   private readonly menuItems = [
      {
         value: 'NGRX',
         route: 'home/ngrx'
      },
      {
         value: 'Data Flow',
         route: 'home/dataflow'
      }];

   getHomeMenu(): void {
      MenuState.items.set(this.menuItems);
   }
}
