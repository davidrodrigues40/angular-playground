import { first, map } from 'rxjs';
import { HttpSignalService } from 'src/app/interfaces/abstracts/http-signal-service.abstract';
import { ISignalService } from 'src/app/interfaces/services/signal-service.interface';
import { chuckNorrisSignals } from 'src/app/state/chuck-norris/chuck-norris.signals';
import { ChuckNorrisFact } from 'src/app/state/chuck-norris/models/chuck-norris-fact';
import { FactCategory } from 'src/app/state/chuck-norris/models/fact-category';

import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal } from '@angular/core';

@Injectable()
export class ChuckNorrisFactsService extends HttpSignalService implements ISignalService
{
   private readonly base_url: string = 'https://api.chucknorris.io/jokes';

   methods: {
      getFact: string;
      getFactForCategory: string;
      getCategories: string;
   } = {
         getFact: 'getFact',
         getFactForCategory: 'getFactForCategory',
         getCategories: 'getCategories'
      };

   override readonly details = {
      getFact: this.getFact,
      getFactForCategory: this.getFactForCategory,
      getCategories: this.getCategories,
      httpClient: this.httpClient,
      base_url: this.base_url
   };

   constructor(private readonly httpClient: HttpClient) { super(); }

   private getFact(storage: WritableSignal<Readonly<ChuckNorrisFact> | null>): void
   {
      this.httpClient?.get<ChuckNorrisFact>(`${this.base_url}/random`)
         .pipe(first())
         .subscribe(fact => storage.set(fact));
   }

   private getFactForCategory(category: FactCategory): void
   {
      if (category.name === 'random')
         this.getFact(chuckNorrisSignals().fact);
      else
         this.httpClient?.get<ChuckNorrisFact>(`${this.base_url}/random?category=${category.name}`)
            .pipe(first())
            .subscribe(fact => chuckNorrisSignals().fact.set(fact));;
   }

   private getCategories(): void
   {
      this.httpClient?.get<string[]>(`${this.base_url}/categories`)
         .pipe(
            map(arr =>
            {
               arr.unshift('random');
               return arr.map(a => { return { name: a }; });
            }))
         .subscribe(categories => chuckNorrisSignals().categories.set(categories));
   }
}
