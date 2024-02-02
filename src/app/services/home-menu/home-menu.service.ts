import { Observable, of } from 'rxjs';
import { MenuItem } from 'src/app/state/menu/models/menu-item';

import { Injectable } from '@angular/core';

@Injectable()
export class HomeMenuService
{
   private readonly _menuItems: ReadonlyArray<MenuItem> = [
      {
         value: 'NGRX',
         route: 'home/ngrx'
      },
      {
         value: 'Data Flow',
         route: 'home/dataflow'
      }];

   constructor() { }

   getHomeMenu$(): Observable<ReadonlyArray<MenuItem>>
   {
      return of(this._menuItems);
   }
}
