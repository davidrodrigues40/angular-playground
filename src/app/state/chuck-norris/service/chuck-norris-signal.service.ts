import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { ISignalStateService } from 'src/app/interfaces/services/signal-state-service.interface';
import { ChuckNorrisFactsService } from 'src/app/services/chuck-norris/chuck-norris-facts.service';

import { effect, Injectable } from '@angular/core';

import { chuckNorrisSignals } from '../chuck-norris.signals';
import { ChuckNorrisFact } from '../models/chuck-norris-fact';
import { FactCategory } from '../models/fact-category';

@Injectable()
export class ChuckNorrisSignalService implements ISignalStateService
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
      },
      bindFooterFact(obj: SignalObject<Readonly<ChuckNorrisFact | null>>): void
      {
         effect(() =>
         {
            obj.value = chuckNorrisSignals().footerFact();
         });
      }
   };
   events = {
      _service: this._service,
      _categories: chuckNorrisSignals().categories(),
      fetchFact(): void
      {
         this._service.dispatch(this._service.methods.getFact, chuckNorrisSignals().fact);
      },
      fetchFactForCategory(category: FactCategory | null): void
      {
         if (category)
            this._service.dispatch(this._service.methods.getFactForCategory, category);
         else
            this.fetchFact();
      },
      fetchFooterFact(): void
      {
         this._service.dispatch(this._service.methods.getFact, chuckNorrisSignals().footerFact);
      },
      fetchCategories(): void
      {
         this._service.dispatch(this._service.methods.getCategories);
      },
      setSelectedCategory(category: FactCategory): void
      {
         chuckNorrisSignals().selectedCategory.set(category);
      },
   };
   observables = {
      get fact(): Readonly<ChuckNorrisFact | null>
      { return chuckNorrisSignals().fact() },
      get footerFact(): Readonly<ChuckNorrisFact | null>
      { return chuckNorrisSignals().footerFact() },
      get categories(): ReadonlyArray<FactCategory> | null
      { return chuckNorrisSignals().categories(); },
      get selectedCategory(): Readonly<FactCategory | null>
      { return chuckNorrisSignals().selectedCategory(); }
   };
}
