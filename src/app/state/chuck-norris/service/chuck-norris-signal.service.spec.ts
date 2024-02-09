import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { ChuckNorrisFactsService } from 'src/app/services/chuck-norris/chuck-norris-facts.service';
import { MockSignalComponent } from 'src/app/testing/testing.components';

import { TestBed } from '@angular/core/testing';

import { ChuckNorrisFact } from '../../../interfaces/models/chuck-norris/chuck-norris-fact';
import { chuckNorrisSignals } from '../chuck-norris.signals';
import { FactCategory } from '../models/fact-category';
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
   const categorySignal: SignalObject<FactCategory | null> = { value: null };
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
   });

   it('should be created', () =>
   {
      expect(service).toBeTruthy();
   });

   describe('effects', () =>
   {
      it('bindCategories should bind to signal value', () =>
      {
         const fixture = TestBed.createComponent(MockSignalComponent);
         const component = fixture.componentInstance;
         component.run(categoriesSignal, 'bindCategories', service);

         chuckNorrisSignals().categories.set([{ ...category, name: 'bindCategories' }]);
         fixture.detectChanges();

         expect(categoriesSignal.value).toBeDefined();
         expect(categoriesSignal.value[0].name).toEqual('bindCategories');
      });

      it('bindFact should bind to signal value', () =>
      {
         const fixture = TestBed.createComponent(MockSignalComponent);
         const component = fixture.componentInstance;
         component.run(factSignal, 'bindFact', service);

         chuckNorrisSignals().fact.set({ ...fact, value: 'bindFact' });
         fixture.detectChanges();

         expect(factSignal.value).toBeDefined();
         expect(factSignal.value?.value).toEqual('bindFact');
      });

      it('bindSelectedCategory should bind to signal value', () =>
      {
         const fixture = TestBed.createComponent(MockSignalComponent);
         const component = fixture.componentInstance;
         component.run(categorySignal, 'bindSelectedCategory', service);

         chuckNorrisSignals().selectedCategory.set({ ...category, name: 'bindSelectedCategory' });
         fixture.detectChanges();

         expect(categorySignal.value).toBeDefined();
         expect(categorySignal.value?.name).toEqual('bindSelectedCategory');
      });

      it('bindFooterFact should bind to signal value', () =>
      {
         const fixture = TestBed.createComponent(MockSignalComponent);
         const component = fixture.componentInstance;
         component.run(factSignal, 'bindFooterFact', service);

         chuckNorrisSignals().footerFact.set({ ...fact, value: 'bindFooterFact' });
         fixture.detectChanges();

         expect(factSignal.value).toBeDefined();
         expect(factSignal.value?.value).toEqual('bindFooterFact');
      });
   });

   describe('events', () =>
   {
      it('fetchFact should dispatch getFact method', () =>
      {
         service.events.fetchFact();
         expect(factService.dispatch).toHaveBeenCalledWith(factService.methods.getFact, chuckNorrisSignals().fact);
      });

      it('fetchFactForCategory should dispatch getFactForCategory method', () =>
      {
         service.events.fetchFactForCategory(category);
         expect(factService.dispatch).toHaveBeenCalledWith(factService.methods.getFactForCategory, category);
      });

      it('fetchFactForCategory should dispatch getFact method if category is null', () =>
      {
         service.events.fetchFactForCategory(null);
         expect(factService.dispatch).toHaveBeenCalledWith(factService.methods.getFact, chuckNorrisSignals().fact);
      });

      it('fetchFooterFact should dispatch getFact method', () =>
      {
         service.events.fetchFooterFact();
         expect(factService.dispatch).toHaveBeenCalledWith(factService.methods.getFact, chuckNorrisSignals().footerFact);
      });

      it('fetchCategories should dispatch getCategories method', () =>
      {
         service.events.fetchCategories();
         expect(factService.dispatch).toHaveBeenCalledWith(factService.methods.getCategories);
      });

      it('setSelectedCategory should set selected category', () =>
      {
         service.events.setSelectedCategory(category);
         expect(chuckNorrisSignals().selectedCategory()).toEqual(category);
      });
   });

   describe('observables', () =>
   {
      it('fact should return fact signal value', () =>
      {
         chuckNorrisSignals().fact.set({ ...fact, value: 'fact' });
         expect(service.observables.fact).toEqual({ ...fact, value: 'fact' });
      });

      it('footerFact should return footer fact signal value', () =>
      {
         chuckNorrisSignals().footerFact.set({ ...fact, value: 'footerFact' });
         expect(service.observables.footerFact).toEqual({ ...fact, value: 'footerFact' });
      });

      it('categories should return categories signal value', () =>
      {
         chuckNorrisSignals().categories.set([{ ...category, name: 'categories' }]);
         expect(service.observables.categories).toEqual([{ ...category, name: 'categories' }]);
      });

      it('selectedCategory should return selected category signal value', () =>
      {
         chuckNorrisSignals().selectedCategory.set({ ...category, name: 'selectedCategory' });
         expect(service.observables.selectedCategory).toEqual({ ...category, name: 'selectedCategory' });
      });
   });
});
