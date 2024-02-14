import { of } from 'rxjs';
import { ChuckNorrisFact } from 'src/app/interfaces/models/chuck-norris/chuck-norris-fact';

import { HttpClient } from '@angular/common/http';
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
         httpClient.get.and.returnValue(of(defaultFact));

         service.dispatch('getFact')
            .subscribe(response =>
            {
               expect(httpClient.get).toHaveBeenCalledWith(`${service['base_url']}/random`);
               expect(response).toEqual(defaultFact);
            });
      }));
   });

   describe('getFactForCategory', () =>
   {
      it('should call httpClient.get with the correct URL', waitForAsync(() =>
      {
         httpClient.get.and.returnValue(of(defaultFact));

         service.dispatch('getFactForCategory', { name: 'category' })
            .subscribe(response =>
            {
               expect(httpClient.get).toHaveBeenCalledWith(`${service['base_url']}/random?category=category`);
               expect(response).toEqual(defaultFact);
            });
      }));

      it('should call getFact if category is random', waitForAsync(() =>
      {
         httpClient.get.and.returnValue(of(defaultFact));

         service.dispatch('getFactForCategory', { name: 'random' })
            .subscribe(response =>
            {
               expect(httpClient.get).toHaveBeenCalledOnceWith(`${service['base_url']}/random`);
               expect(response).toEqual(defaultFact);
            });
      }));
   });

   describe('getCategories', () =>
   {
      it('should call httpClient.get with the correct URL', waitForAsync(() =>
      {
         httpClient.get.and.returnValue(of(['category']));

         service.dispatch('getCategories')
            .subscribe(response =>
            {
               expect(httpClient.get).toHaveBeenCalledWith(`${service['base_url']}/categories`);
               expect(response).toEqual([{ name: 'random' }, { name: 'category' }]);
            });
      }));
   });

   describe('when method not found', () =>
   {
      it('should return true', waitForAsync(() =>
      {
         service.dispatch('notFound')
            .subscribe(response =>
            {
               expect(response).toBeTrue();
            });
      }));
   });
});