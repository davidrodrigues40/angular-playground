import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { MenuService } from 'src/app/services/menu/menu.service';

import { TestBed, waitForAsync } from '@angular/core/testing';

import { of } from 'rxjs';
import { configureEventTestingModule, eventTest } from 'src/app/testing/testing.functions';
import { MenuItem } from '../../../interfaces/models/menu/menu-item';
import { menuSignals } from '../menu.signals';
import { MenuSignalService } from './menu-signal.service';

describe('MenuSignalService', () =>
{
   let service: MenuSignalService;
   const menuService: jasmine.SpyObj<MenuService> = jasmine.createSpyObj('MenuService', ['dispatch', 'methods']);
   const signal: SignalObject<ReadonlyArray<MenuItem>> = { value: [] };
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

   describe('effects', () =>
   {
      it('should bind menu', () =>
      {
         // Arrange
         const title: string = 'bind menu';
         const menu: MenuItem[] = [{ ...menuItem, value: title }];
         configureEventTestingModule(signal, 'bindMenu', service);

         // Act
         eventTest(menu, menuSignals().items);

         expect(signal.value).toBeDefined();
         expect(signal.value[0].value).toEqual(title);
      });
   });

   describe('methods', () =>
   {
      it('should fetch menu', waitForAsync(() =>
      {
         spyOn(menuSignals(), 'items').and.returnValue([]);
         spyOn(menuSignals().items, 'set');
         menuService.dispatch.and.returnValue(of([menuItem]));

         service.methods.fetchMenu();

         expect(menuService.dispatch).toHaveBeenCalledWith(menuService.methods.getMenu);
         expect(menuSignals().items.set).toHaveBeenCalledWith([menuItem]);
      }));
   });

   describe('data', () =>
   {
      it('should get menu', () =>
      {
         menuSignals().items.set([{ ...menuItem, value: 'get menu' }]);

         expect(service.data.menu[0].value).toEqual('get menu');
      });
   });
});
