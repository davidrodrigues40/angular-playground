import { FactCategory } from 'src/app/interfaces/models/chuck-norris/fact-category';
import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { ChuckNorrisFactsService } from 'src/app/services/chuck-norris/chuck-norris-facts.service';

import { TestBed, waitForAsync } from '@angular/core/testing';

import { of } from 'rxjs';
import { configureEventTestingModule, eventTest } from 'src/app/testing/testing.functions';
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
   const categoryFactSignal: SignalObject<FactCategory | null> = { value: null };
   const categoriesSignal: SignalObject<ReadonlyArray<FactCategory>> = { value: [] };
   const factSignal: SignalObject<Readonly<ChuckNorrisFact> | null> = { value: null };

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

   describe('effects', () =>
   {
      it('bindCategories should bind to signal value', () =>
      {
         // Arrange
         const categoryName: string = 'bind categories';
         const myCategories = [{ ...category, name: categoryName }];
         configureEventTestingModule(categoriesSignal, 'bindCategories', service);

         eventTest(myCategories, chuckNorrisSignals().categories);

         expect(categoriesSignal.value).toBeDefined();
         expect(categoriesSignal.value.length).toEqual(1);
         expect(categoriesSignal.value[0].name).toEqual(categoryName);
      });

      it('bindFact should bind to signal value', () =>
      {
         const factName: string = 'bind fact';
         const myFact: ChuckNorrisFact = { ...fact, value: factName };
         configureEventTestingModule(factSignal, 'bindFact', service);

         eventTest(myFact, chuckNorrisSignals().fact);

         expect(factSignal.value).toBeDefined();
         expect(factSignal.value?.value).toEqual(factName);
      });

      it('bindSelectedCategory should bind to signal value', () =>
      {
         const categoryName: string = 'bind selected category';
         const myCategory: FactCategory = { ...category, name: categoryName };
         configureEventTestingModule(categoryFactSignal, 'bindSelectedCategory', service);

         eventTest(myCategory, chuckNorrisSignals().selectedCategory);

         expect(categoryFactSignal.value).toBeDefined();
         expect(categoryFactSignal.value?.name).toEqual(categoryName);
      });

      it('bindFooterFact should bind to signal value', () =>
      {
         const factName: string = 'bind Footer Fact';
         const myFact: ChuckNorrisFact = { ...fact, value: factName };
         configureEventTestingModule(factSignal, 'bindFooterFact', service);

         eventTest(myFact, chuckNorrisSignals().footerFact);

         expect(factSignal.value).toBeDefined();
         expect(factSignal.value?.value).toEqual(factName);
      });
   });

   describe('methods', () =>
   {
      it('fetchFact should dispatch getFact method', waitForAsync(() =>
      {
         const testFact = setupTest('getFact');

         service.methods.fetchFact();

         expect(factService.dispatch).toHaveBeenCalledWith(factService.methods.getFact);
         expect(chuckNorrisSignals().fact()).toEqual(testFact);
      }));

      it('fetchFactForCategory should dispatch getFactForCategory method', waitForAsync(() =>
      {
         const testFact = setupTest('getFactForCategory');

         service.methods.fetchFactForCategory(category);

         expect(factService.dispatch).toHaveBeenCalledWith(factService.methods.getFactForCategory, category);
         expect(chuckNorrisSignals().fact()).toEqual(testFact);
      }));

      it('fetchFactForCategory should dispatch getFact method if category is null', () =>
      {
         const testFact = setupTest('fetchFactForCategory getFact');

         service.methods.fetchFactForCategory(null);

         expect(factService.dispatch).toHaveBeenCalledWith(factService.methods.getFact);
         expect(chuckNorrisSignals().fact()).toEqual(testFact);
      });

      it('fetchFooterFact should dispatch getFact method', () =>
      {
         const testFact = setupTest('fetchFooterFact');

         service.methods.fetchFooterFact();

         expect(factService.dispatch).toHaveBeenCalledWith(factService.methods.getFact);
         expect(chuckNorrisSignals().footerFact()).toEqual(testFact);
      });

      it('fetchCategories should dispatch getCategories method', () =>
      {
         factService.dispatch.and.returnValue(of([category]));

         service.methods.fetchCategories();

         expect(factService.dispatch).toHaveBeenCalledTimes(1);
      });

      it('setSelectedCategory should set selected category', () =>
      {
         service.methods.setSelectedCategory(category);
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

   describe('data', () =>
   {
      it('fact should return fact signal value', () =>
      {
         chuckNorrisSignals().fact.set({ ...fact, value: 'fact' });
         expect(service.data.fact).toEqual({ ...fact, value: 'fact' });
      });

      it('footerFact should return footer fact signal value', () =>
      {
         chuckNorrisSignals().footerFact.set({ ...fact, value: 'footerFact' });
         expect(service.data.footerFact).toEqual({ ...fact, value: 'footerFact' });
      });

      it('categories should return categories signal value', () =>
      {
         chuckNorrisSignals().categories.set([{ ...category, name: 'categories' }]);
         expect(service.data.categories).toEqual([{ ...category, name: 'categories' }]);
      });

      it('selectedCategory should return selected category signal value', () =>
      {
         chuckNorrisSignals().selectedCategory.set({ ...category, name: 'selectedCategory' });
         expect(service.data.selectedCategory).toEqual({ ...category, name: 'selectedCategory' });
      });
   });
});
