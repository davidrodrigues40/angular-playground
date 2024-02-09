import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { MenuService } from 'src/app/services/menu/menu.service';
import { MockSignalComponent } from 'src/app/testing/testing.components';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItem } from '../../../interfaces/models/menu/menu-item';
import { menuSignals } from '../menu.signals';
import { MenuSignalService } from './menu-signal.service';

describe('MenuSignalService', () =>
{
   let service: MenuSignalService;
   let fixture: ComponentFixture<MockSignalComponent>;
   let component: MockSignalComponent;
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
      fixture = TestBed.createComponent(MockSignalComponent);
      component = fixture.componentInstance;
   });

   it('should be created', () =>
   {
      expect(service).toBeTruthy();
   });

   describe('effects', () =>
   {
      it('should bind menu', () =>
      {
         const title: string = 'bind menu';
         component.run(signal, 'bindMenu', service);
         menuSignals().items.set([{ ...menuItem, value: title }]);
         fixture.detectChanges();

         expect(signal.value).toBeDefined();
         expect(signal.value[0].value).toEqual(title);
      });
   });

   describe('events', () =>
   {
      it('should fetch menu', () =>
      {
         service.events._menuItems = [];

         service.events.fetchMenu();

         expect(menuService.dispatch).toHaveBeenCalledWith(menuService.methods.getMenu);
      });
   });

   describe('observables', () =>
   {
      it('should get menu', () =>
      {
         menuSignals().items.set([{ ...menuItem, value: 'get menu' }]);

         expect(service.observables.menu[0].value).toEqual('get menu');
      });
   });
});