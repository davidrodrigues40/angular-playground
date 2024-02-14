import { Observable, first, map } from 'rxjs';
import { HttpSignalService } from 'src/app/interfaces/abstracts/http-signal-service.abstract';
import { ChuckNorrisFact } from 'src/app/interfaces/models/chuck-norris/chuck-norris-fact';
import { FactCategory } from 'src/app/interfaces/models/chuck-norris/fact-category';
import { ISignalService } from 'src/app/interfaces/services/signal-service.interface';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

   readonly details = {
      getFact: this.getFact,
      getFactForCategory: this.getFactForCategory,
      getCategories: this.getCategories,
      httpClient: this.httpClient,
      base_url: this.base_url
   };

   constructor(private readonly httpClient: HttpClient) { super(); }

   private getFact(): Observable<ChuckNorrisFact>
   {
      return this.httpClient?.get<ChuckNorrisFact>(`${this.base_url}/random`)
         .pipe(first());
   }

   private getFactForCategory(category: FactCategory): Observable<ChuckNorrisFact>
   {
      if (category.name === 'random')
         return this.getFact();
      else
         return this.httpClient?.get<ChuckNorrisFact>(`${this.base_url}/random?category=${category.name}`)
            .pipe(first());
   }

   private getCategories(): Observable<FactCategory[]>
   {
      return this.httpClient?.get<string[]>(`${this.base_url}/categories`)
         .pipe(
            map(arr =>
            {
               arr.unshift('random');

               return arr.map(a => { return { name: a }; });
            }));
   }
}
