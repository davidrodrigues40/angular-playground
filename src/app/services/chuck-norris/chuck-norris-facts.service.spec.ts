import { of } from 'rxjs';
import { chuckNorrisSignals } from 'src/app/state/chuck-norris/chuck-norris.signals';
import { ChuckNorrisFact } from 'src/app/state/chuck-norris/models/chuck-norris-fact';

import { HttpClient } from '@angular/common/http';
import { WritableSignal } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { ChuckNorrisFactsService } from './chuck-norris-facts.service';

describe('ChuckNorrisFactsService', () =>
{
   let service: ChuckNorrisFactsService;
   let httpClient: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);
   const defaultFact: ChuckNorrisFact = {
      icon_url: '',
      id: '',
      url: '',
      value: ''
   };

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         providers: [
            ChuckNorrisFactsService,
            { provide: HttpClient, useValue: httpClient }
         ]
      });
      service = TestBed.inject(ChuckNorrisFactsService);
      httpClient.get.calls.reset();
   });

   it('should be created', () =>
   {
      expect(service).toBeTruthy();
   });

   describe('getFact', () =>
   {
      it('should call httpClient.get with the correct URL', waitForAsync(() =>
      {
         const storage: WritableSignal<ChuckNorrisFact | null> = chuckNorrisSignals().fact;
         spyOn(storage, 'set');
         httpClient.get.and.returnValue(of(defaultFact));

         service.dispatch('getFact', storage);

         expect(httpClient.get).toHaveBeenCalledWith(`${service['base_url']}/random`);
         expect(storage.set).toHaveBeenCalledOnceWith(defaultFact);
      }));
   });

   describe('getFactForCategory', () =>
   {
      it('should call httpClient.get with the correct URL', waitForAsync(() =>
      {
         const storage: WritableSignal<ChuckNorrisFact | null> = chuckNorrisSignals().fact;
         spyOn(storage, 'set');
         httpClient.get.and.returnValue(of(defaultFact));

         service.dispatch('getFactForCategory', { name: 'category' });

         expect(httpClient.get).toHaveBeenCalledWith(`${service['base_url']}/random?category=category`);
         expect(storage.set).toHaveBeenCalledOnceWith(defaultFact);
      }));

      it('should call getFact if category is random', waitForAsync(() =>
      {
         spyOn(chuckNorrisSignals().fact, 'set');
         httpClient.get.and.returnValue(of(defaultFact));

         service.dispatch('getFactForCategory', { name: 'random' });

         expect(httpClient.get).toHaveBeenCalledOnceWith(`${service['base_url']}/random`);
         expect(chuckNorrisSignals().fact.set).toHaveBeenCalledOnceWith(defaultFact);
      }));
   });

   describe('getCategories', () =>
   {
      it('should call httpClient.get with the correct URL', waitForAsync(() =>
      {
         spyOn(chuckNorrisSignals().categories, 'set');
         httpClient.get.and.returnValue(of(['category']));

         service.dispatch('getCategories');

         expect(httpClient.get).toHaveBeenCalledWith(`${service['base_url']}/categories`);
         expect(chuckNorrisSignals().categories.set).toHaveBeenCalledOnceWith([{ name: 'random' }, { name: 'category' }]);
      }));
   });
});