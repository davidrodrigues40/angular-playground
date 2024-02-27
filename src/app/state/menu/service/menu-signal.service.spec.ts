import { MenuService } from 'src/app/services/menu/menu.service';

import { TestBed, waitForAsync } from '@angular/core/testing';

import { of } from 'rxjs';
import { MenuItem } from '../../../interfaces/models/menu/menu-item';
import { menuSignals } from '../menu.signals';
import { MenuSignalService } from './menu-signal.service';

describe('MenuSignalService', () =>
{
   let service: MenuSignalService;
   const menuService: jasmine.SpyObj<MenuService> = jasmine.createSpyObj('MenuService', ['dispatch', 'methods']);
   const menuItem: MenuItem = {
      value: '',
      route: ''
   };

   beforeAll(() =>
   {
      Object.defineProperty(menuService.methods, 'getMenu', { value: 'getMenu' });
   });

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         providers: [
            MenuSignalService,
            { provide: MenuService, useValue: menuService }
         ]
      });

      service = TestBed.inject(MenuSignalService);
   });

   it('should be created', () =>
   {
      expect(service).toBeTruthy();
   });

   describe('methods', () =>
   {
      it('should fetch menu', waitForAsync(() =>
      {
         spyOn(menuSignals(), 'items').and.returnValue([]);
         spyOn(menuSignals().items, 'set');
         menuService.dispatch.and.returnValue(of([menuItem]));

         service.fetchMenu();

         expect(menuService.dispatch).toHaveBeenCalledWith(menuService.methods.getMenu);
         expect(menuSignals().items.set).toHaveBeenCalledWith([menuItem]);
      }));
   });
});
