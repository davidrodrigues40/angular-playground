import { first, map } from 'rxjs';
import { HttpSignalService } from 'src/app/interfaces/abstracts/http-signal-service.abstract';
import { IHttpSignalService } from 'src/app/interfaces/services/signal-service.interface';
import { chuckNorrisSignals } from 'src/app/state/chuck-norris/chuck-norris.signals';
import { ChuckNorrisFact } from 'src/app/state/chuck-norris/models/chuck-norris-fact';
import { FactCategory } from 'src/app/state/chuck-norris/models/fact-category';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ChuckNorrisFactsService extends HttpSignalService implements IHttpSignalService
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
      getFact: this._getFact,
      getFactForCategory: this._getFactForCategory,
      getCategories: this._getCategories,
      httpClient: this.httpClient,
      base_url: this.base_url
   };

   constructor(private readonly httpClient: HttpClient) { super(); }

   private _getFact(): void
   {
      this.httpClient?.get<ChuckNorrisFact>(`${this.base_url}/random`)
         .pipe(first())
         .subscribe(fact => chuckNorrisSignals().fact.set(fact));
   }

   private _getFactForCategory(payload: { category: FactCategory }): void
   {
      if (payload.category.name === 'random')
         this._getFact();

      this.httpClient?.get<ChuckNorrisFact>(`${this.base_url}/random?category=${payload.category.name}`)
         .pipe(first())
         .subscribe(fact => chuckNorrisSignals().fact.set(fact));;
   }

   private _getCategories(): void
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
