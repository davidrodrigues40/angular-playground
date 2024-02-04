import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { IHttpSignalStateService } from 'src/app/interfaces/services/signal-state-service.interface';
import { ChuckNorrisFactsService } from 'src/app/services/chuck-norris/chuck-norris-facts.service';

import { effect, Injectable } from '@angular/core';

import { chuckNorrisSignals } from '../chuck-norris.signals';
import { ChuckNorrisFact } from '../models/chuck-norris-fact';
import { FactCategory } from '../models/fact-category';

@Injectable()
export class ChuckNorrisSignalService implements IHttpSignalStateService
{
   constructor(private readonly _service: ChuckNorrisFactsService) { }
   effects = {
      _service: this._service,
      bindCategories(obj: SignalObject<ReadonlyArray<FactCategory> | null>): void
      {
         effect(() =>
         {
            obj.value = chuckNorrisSignals().categories();
         });
      },
      bindFact(obj: SignalObject<Readonly<ChuckNorrisFact | null>>): void
      {
         effect(() =>
         {
            obj.value = chuckNorrisSignals().fact();
         });
      },
      bindSelectedCategory(obj: SignalObject<FactCategory | null>): void
      {
         effect(() =>
         {
            obj.value = chuckNorrisSignals().selectedCategory();
         });
      }
   };
   events = {
      _service: this._service,
      _categories: chuckNorrisSignals().categories(),
      fetchFact(): void
      {
         this._service.dispatch(this._service.methods.getFact);
      },
      fetchFactForCategory(category: FactCategory | null): void
      {
         if (category)
            this._service.dispatch(this._service.methods.getFactForCategory, category);
         else
            this.fetchFact();
      },
      fetchCategories(): void
      {
         this._service.dispatch(this._service.methods.getCategories);
      },
      setSelectedCategory(category: FactCategory): void
      {
         chuckNorrisSignals().selectedCategory.set(category);
      }
   };
   observables = {
      get fact(): Readonly<ChuckNorrisFact | null>
      { return chuckNorrisSignals().fact() },
      get categories(): ReadonlyArray<FactCategory> | null
      { return chuckNorrisSignals().categories(); },
      get selectedCategory(): Readonly<FactCategory | null>
      { return chuckNorrisSignals().selectedCategory(); }
   };
}
