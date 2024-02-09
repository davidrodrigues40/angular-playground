import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { HomeMenuService } from 'src/app/services/home-menu/home-menu.service';
import { MockSignalComponent } from 'src/app/testing/testing.components';

import { TestBed } from '@angular/core/testing';

import { MenuItem } from '../../../interfaces/models/menu/menu-item';
import { homeMenuSignals } from '../home-menu.signals';
import { HomeMenuSignalService } from './home-menu-signal.service';

describe('HomeMenuSignalService', () =>
{
   let service: HomeMenuSignalService;
   let _service: jasmine.SpyObj<HomeMenuService> = jasmine.createSpyObj('HomeMenuService', ['dispatch'], ['methods']);
   const menu: Array<MenuItem> = [];
   const signal: SignalObject<ReadonlyArray<MenuItem>> = { value: menu };
   const myMenu: Array<MenuItem> = [...menu, { value: 'test', route: '/test' }];

   beforeEach(() =>
   {
      Object.defineProperty(_service, 'methods', { value: { getHomeMenu: 'getHomeMenu' } });
      TestBed.configureTestingModule({
         imports: [MockSignalComponent],
         providers: [
            HomeMenuSignalService,
            {
               provide: HomeMenuService, useValue: _service
            }]
      });

      service = TestBed.inject(HomeMenuSignalService);

      _service.dispatch.calls.reset();
   });

   it('should be created', () =>
   {
      expect(service).toBeTruthy();
   });

   describe('effects', () =>
   {
      it('bindMenu should call dispatch when _menuItems is empty', () =>
      {
         const fixture = TestBed.createComponent(MockSignalComponent);
         const component = fixture.componentInstance;
         component.run(signal, 'bindMenu', service);

         homeMenuSignals().items.set(myMenu);
         fixture.detectChanges();

         expect(signal.value).toEqual(myMenu);
      });
   });

   describe('events', () =>
   {
      it('should not dispatch when fetchMenu is called and _menuItems is set', () =>
      {
         service.events._menuItems = myMenu;

         service.events.fetchMenu();

         expect(_service.dispatch).not.toHaveBeenCalled();
      });
      it('should call dispatch when fetchMenu is called and not set', () =>
      {
         service.events._menuItems = [];

         service.events.fetchMenu();

         expect(_service.dispatch).toHaveBeenCalledWith('getHomeMenu');
      });
   });

   describe('observables', () =>
   {
      it('should return _menuItems when get menu is called', () =>
      {
         homeMenuSignals().items.set(myMenu);

         const actual = service.observables.menu;

         expect(actual).toEqual(myMenu);
      });
   })
});
