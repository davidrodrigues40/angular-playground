import { IHttpSignalStateService } from 'src/app/interfaces/services/signal-state-service.interface';
import { ChuckNorrisFactsService } from 'src/app/services/chuck-norris/chuck-norris-facts.service';

import { Injectable } from '@angular/core';

import { chuckNorrisSignals } from '../chuck-norris.signals';
import { ChuckNorrisFact } from '../models/chuck-norris-fact';
import { FactCategory } from '../models/fact-category';

@Injectable()
export class ChuckNorrisSignalService implements IHttpSignalStateService
{
   constructor(private readonly _service: ChuckNorrisFactsService) { }

   events = {
      _service: this._service,
      _categories: chuckNorrisSignals().categories(),
      fetchCategories(): void
      {
         this._service.dispatch(this._service.methods.getCategories);
      },
      fetchFact(): void
      {
         this._service.dispatch(this._service.methods.getFact);
      },
      fetchFactForCategory(category: FactCategory): void
      {
         this._service.dispatch(this._service.methods.getFactForCategory, { category: category });
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
