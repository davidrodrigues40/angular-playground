import { homeMenuSignals } from 'src/app/state/home-menu/home-menu.signals';
import { MenuItem } from 'src/app/state/menu/models/menu-item';

import { TestBed } from '@angular/core/testing';

import { HomeMenuService } from './home-menu.service';

describe('HomeMenuService', () =>
{
   let service: HomeMenuService;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         providers: [HomeMenuService]
      });
      service = TestBed.inject(HomeMenuService);
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
            getHomeMenu: 'getHomeMenu'
         });
      });
   });

   describe('details', () =>
   {
      it('should return all details', () =>
      {
         expect(service.details).toEqual({
            getHomeMenu: service['getHomeMenu'],
            httpClient: undefined,
            base_url: undefined
         });
      });
   });

   describe('dispatch', () =>
   {
      it('should dispatch getHomeMenu', () =>
      {
         const menuItems: Array<MenuItem> = [
            {
               value: 'NGRX',
               route: 'home/ngrx'
            },
            {
               value: 'Data Flow',
               route: 'home/dataflow'
            }];
         const signalSpy = spyOn(homeMenuSignals().items, 'set');

         service.dispatch(service.methods.getHomeMenu);

         expect(signalSpy).toHaveBeenCalledOnceWith(menuItems);
      });
   });
});
