import { FactCategory } from 'src/app/interfaces/models/chuck-norris/fact-category';
import { ChuckNorrisFactsService } from 'src/app/services/chuck-norris/chuck-norris-facts.service';

import { Injectable } from '@angular/core';

import { ChuckNorrisFact } from '../../../interfaces/models/chuck-norris/chuck-norris-fact';
import { chuckNorrisSignals } from '../chuck-norris.signals';

@Injectable()
export class ChuckNorrisSignalService
{
   constructor(private readonly _service: ChuckNorrisFactsService) { }

   fetchFact(): void
   {
      this._service.dispatch(this._service.methods.getFact)
         .subscribe((fact: Readonly<ChuckNorrisFact> | null) => chuckNorrisSignals().fact.set(fact));
   }

   fetchFactForCategory(category: FactCategory | null): void
   {
      if (category)
         this._service.dispatch(this._service.methods.getFactForCategory, category)
            .subscribe((fact: Readonly<ChuckNorrisFact> | null) => chuckNorrisSignals().fact.set(fact));
      else
         this.fetchFact();
   }


   fetchFooterFact(): void
   {
      this._service.dispatch(this._service.methods.getFact)
         .subscribe((fact: Readonly<ChuckNorrisFact> | null) => chuckNorrisSignals().footerFact.set(fact));
   }
   fetchCategories(): void
   {
      this._service.dispatch(this._service.methods.getCategories)
         .subscribe((categories: ReadonlyArray<FactCategory> | null) => chuckNorrisSignals().categories.set(categories));
   }

   setSelectedCategory(category: FactCategory): void
   {
      chuckNorrisSignals().selectedCategory.set(category);
   }
}
