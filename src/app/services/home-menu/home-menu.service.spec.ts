import { MenuItem } from 'src/app/interfaces/models/menu/menu-item';

import { TestBed } from '@angular/core/testing';

import { HomeMenuService } from './home-menu.service';
import { MenuState } from 'src/app/state/menu.state';

describe('HomeMenuService', () => {
   let service: HomeMenuService;

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [HomeMenuService]
      });
      service = TestBed.inject(HomeMenuService);
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });

   describe('getMenu', () => {
      it('should dispatch getHomeMenu', () => {
         const menuItems: Array<MenuItem> = [
            {
               value: 'NGRX',
               route: 'home/ngrx'
            },
            {
               value: 'Data Flow',
               route: 'home/dataflow'
            }];

         service.getHomeMenu();

         expect(MenuState.items()).toEqual(menuItems);
      });
   });
});
