import { menuSignals } from 'src/app/state/menu/menu.signals';

import { TestBed, waitForAsync } from '@angular/core/testing';

import { MenuService } from './menu.service';

describe('MenuService', () =>
{
   let service: MenuService;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         providers: [
            MenuService
         ]
      });
      service = TestBed.inject(MenuService);
   });

   it('should be created', () =>
   {
      expect(service).toBeTruthy();
   });

   describe('methods', () =>
   {
      it('should return all methods', () =>
      {
         expect(service.methods).toEqual({
            getMenu: 'getMenu'
         });
      });
   });

   describe('details', () =>
   {
      it('should return all details', () =>
      {
         expect(service.details).toEqual({
            getMenu: service['getMenu'],
            httpClient: undefined,
            base_url: ''
         });
      });
   });

   describe('dispatch', () =>
   {
      it('should dispatch getMenu', waitForAsync(() =>
      {
         const menuItems = [
            { value: 'Home', route: '/home' },
            { value: 'Books', route: '/books' },
            { value: 'Bowling', route: '/bowling' },
            { value: 'Chuck Norris Facts', route: '/chuck-norris-facts' },
         ];
         const signalSpy = spyOn(menuSignals().items, 'set');

         service.dispatch(service.methods.getMenu)
            .subscribe(items =>
            {
               expect(items).toEqual(menuItems);
            });
      }));
   });
});