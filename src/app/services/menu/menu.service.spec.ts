
import { TestBed } from '@angular/core/testing';

import { MenuService } from './menu.service';
import { MenuState } from 'src/app/state/menu.state';

describe('MenuService', () => {
   let service: MenuService;

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [
            MenuService
         ]
      });
      service = TestBed.inject(MenuService);
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });

   describe('when getMenu invoked', () => {
      it('should set menu items in the state', () => {
         const menuStateSpy = spyOn(MenuState.items, 'set');

         service.getMenu();

         expect(menuStateSpy).toHaveBeenCalledWith(service['_menuItems']);
      });
   });
});