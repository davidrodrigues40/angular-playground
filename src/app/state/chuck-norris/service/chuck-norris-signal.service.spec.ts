import { FactCategory } from 'src/app/interfaces/models/chuck-norris/fact-category';
import { ChuckNorrisFactsService } from 'src/app/services/chuck-norris/chuck-norris-facts.service';

import { TestBed, waitForAsync } from '@angular/core/testing';

import { of } from 'rxjs';
import { ChuckNorrisFact } from '../../../interfaces/models/chuck-norris/chuck-norris-fact';
import { chuckNorrisSignals } from '../chuck-norris.signals';
import { ChuckNorrisSignalService } from './chuck-norris-signal.service';

describe('ChuckNorrisSignalService', () =>
{
   let service: ChuckNorrisSignalService;
   let factService: jasmine.SpyObj<ChuckNorrisFactsService> = jasmine.createSpyObj('ChuckNorrisFactsService', ['dispatch']);
   const fact: ChuckNorrisFact = {
      icon_url: '',
      id: '',
      url: '',
      value: ''
   };
   const category: FactCategory = { name: 'test' };

   beforeAll(() =>
   {
      Object.defineProperties(factService, {
         methods: { value: { getFact: 'getFact', getFactForCategory: 'getFactForCategory', getCategories: 'getCategories' } }
      });
   });

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         providers: [
            ChuckNorrisSignalService,
            { provide: ChuckNorrisFactsService, useValue: factService }
         ]
      });
      service = TestBed.inject(ChuckNorrisSignalService);
      factService.dispatch.calls.reset();
   });

   it('should be created', () =>
   {
      expect(service).toBeTruthy();
   });

   describe('methods', () =>
   {
      it('fetchFact should dispatch getFact method', waitForAsync(() =>
      {
         const testFact = setupTest('getFact');

         service.fetchFact();

         expect(factService.dispatch).toHaveBeenCalledWith(factService.methods.getFact);
         expect(chuckNorrisSignals().fact()).toEqual(testFact);
      }));

      it('fetchFactForCategory should dispatch getFactForCategory method', waitForAsync(() =>
      {
         const testFact = setupTest('getFactForCategory');

         service.fetchFactForCategory(category);

         expect(factService.dispatch).toHaveBeenCalledWith(factService.methods.getFactForCategory, category);
         expect(chuckNorrisSignals().fact()).toEqual(testFact);
      }));

      it('fetchFactForCategory should dispatch getFact method if category is null', () =>
      {
         const testFact = setupTest('fetchFactForCategory getFact');

         service.fetchFactForCategory(null);

         expect(factService.dispatch).toHaveBeenCalledWith(factService.methods.getFact);
         expect(chuckNorrisSignals().fact()).toEqual(testFact);
      });

      it('fetchFooterFact should dispatch getFact method', () =>
      {
         const testFact = setupTest('fetchFooterFact');

         service.fetchFooterFact();

         expect(factService.dispatch).toHaveBeenCalledWith(factService.methods.getFact);
         expect(chuckNorrisSignals().footerFact()).toEqual(testFact);
      });

      it('fetchCategories should dispatch getCategories method', () =>
      {
         factService.dispatch.and.returnValue(of([category]));

         service.fetchCategories();

         expect(factService.dispatch).toHaveBeenCalledTimes(1);
      });

      it('setSelectedCategory should set selected category', () =>
      {
         service.setSelectedCategory(category);
         expect(chuckNorrisSignals().selectedCategory()).toEqual(category);
      });

      function setupTest(value: string): ChuckNorrisFact
      {
         const testFact: ChuckNorrisFact = { ...fact, value: value };
         chuckNorrisSignals().fact.set(null);
         chuckNorrisSignals().footerFact.set(null);
         factService.dispatch.and.returnValue(of(testFact));

         return testFact;
      }
   });
});
