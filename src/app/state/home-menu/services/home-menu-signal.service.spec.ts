import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { HomeMenuService } from 'src/app/services/home-menu/home-menu.service';
import { MockSignalComponent } from 'src/app/testing/testing.components';

import { TestBed, waitForAsync } from '@angular/core/testing';

import { of } from 'rxjs';
import { MenuItem } from '../../../interfaces/models/menu/menu-item';
import { homeMenuSignals } from '../home-menu.signals';
import { HomeMenuSignalService } from './home-menu-signal.service';

describe('HomeMenuSignalService', () =>
{
   let service: HomeMenuSignalService;
   let menuService: jasmine.SpyObj<HomeMenuService> = jasmine.createSpyObj('HomeMenuService', ['dispatch'], ['methods']);
   const menu: Array<MenuItem> = [];
   const myMenu: Array<MenuItem> = [...menu, { value: 'test', route: '/test' }];

   beforeEach(() =>
   {
      Object.defineProperty(menuService, 'methods', { value: { getHomeMenu: 'getHomeMenu' } });
      TestBed.configureTestingModule({
         imports: [MockSignalComponent],
         providers: [
            HomeMenuSignalService,
            {
               provide: HomeMenuService, useValue: menuService
            }]
      });

      service = TestBed.inject(HomeMenuSignalService);

      menuService.dispatch.calls.reset();
   });

   it('should be created', () =>
   {
      expect(service).toBeTruthy();
   });

   describe('methods', () =>
   {
      it('should not dispatch when fetchMenu is called and _menuItems is set', waitForAsync(() =>
      {
         spyOn(homeMenuSignals(), 'items').and.returnValue(myMenu);
         spyOn(homeMenuSignals().items, 'set');
         menuService.dispatch.and.returnValue(of(myMenu));

         service.fetchMenu();

         expect(menuService.dispatch).not.toHaveBeenCalled();
         expect(homeMenuSignals().items.set).not.toHaveBeenCalled();
      }));

      it('should call dispatch when fetchMenu is called and not set', waitForAsync(() =>
      {
         spyOn(homeMenuSignals(), 'items').and.returnValue([]);
         spyOn(homeMenuSignals().items, 'set');
         menuService.dispatch.and.returnValue(of(myMenu));

         service.fetchMenu();

         expect(menuService.dispatch).toHaveBeenCalledWith('getHomeMenu');
         expect(homeMenuSignals().items.set).toHaveBeenCalledWith(myMenu);
      }));
   });
});
