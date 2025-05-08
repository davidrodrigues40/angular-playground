import { debounceTime, delay, first, map } from 'rxjs';
import { ChuckNorrisFact } from 'src/app/modules/chuck-norris-fact/models/chuck-norris-fact';
import { FactCategory } from 'src/app/modules/chuck-norris-fact/models/fact-category';

import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal } from '@angular/core';
import { ChuckNorrisFactState } from 'src/app/modules/chuck-norris-fact/chuck-norris.state';

@Injectable()
export class ChuckNorrisFactsService {
   private readonly base_url: string = 'https://api.chucknorris.io/jokes';

   constructor(private readonly httpClient: HttpClient) { }

   getFact(): void {
      this.getFactForState(ChuckNorrisFactState.fact, ChuckNorrisFactState.loading);
   }

   getFactForCategory(category: FactCategory): void {
      if (category.name === 'random')
         this.getFact();
      else
         this.httpClient?.get<ChuckNorrisFact>(`${this.base_url}/random?category=${category.name}`)
            .pipe(
               first(),
               debounceTime(2000),)
            .subscribe((fact: ChuckNorrisFact) => {
               ChuckNorrisFactState.fact.set(fact);
               ChuckNorrisFactState.loading.set(false);
            });
   }

   getCategories(): void {
      this.httpClient?.get<string[]>(`${this.base_url}/categories`)
         .pipe(
            map(arr => {
               arr.unshift('random');
               return arr.map(a => { return { name: a }; });
            }))
         .subscribe((categories: FactCategory[]) => ChuckNorrisFactState.categories.set(categories));
   }

   getFooterFact(): void {
      this.getFactForState(ChuckNorrisFactState.footerFact, ChuckNorrisFactState.footerLoading);
   }

   getFavoriteFacts(): void {
      ChuckNorrisFactState.favoriteFacts.set(this.favoriteFacts);
   }

   getFavoriteFact(category: string = 'random'): void {
      const list = this.favoriteFacts.filter(fact => fact.catetories?.includes(category));
      const index = Math.round(Math.random() * list.length);

      ChuckNorrisFactState.fact.set(list[index]);
   }

   private getFactForState(
      signal: WritableSignal<Readonly<ChuckNorrisFact | null>>,
      loadingSignal: WritableSignal<Readonly<boolean>>): void {
      this.httpClient?.get<ChuckNorrisFact>(`${this.base_url}/random`)
         .pipe(
            first(),
            delay(2000),)
         .subscribe((fact: ChuckNorrisFact) => {
            signal.set(fact);
            loadingSignal.set(false);
         });
   }

   private readonly favoriteFacts: ChuckNorrisFact[] = [
      this.generateFact('1', 'Chuck Norris can divide by zero.', ['random', 'science']),
      this.generateFact('2', 'Chuck Norris counted to infinity. Twice.', ['random', 'science']),
      this.generateFact('3', 'When the Boogeyman goes to sleep, he checks his closet for Chuck Norris.', ['random']),
      this.generateFact('4', 'Chuck Norris can slam a revolving door.', ['random', 'science']),
      this.generateFact('5', 'Chuck Norris can run Windows 7 on a Commodore 64.', ['random', 'science']),
      this.generateFact('6', 'Chuck Norris can unscramble an egg.', ['random', 'food']),
      this.generateFact('7', 'Chuck Norris can do a wheelie on a unicycle.', ['random', 'sport']),
      this.generateFact('8', 'Chuck Norris built the house he was born in with his own hands.', ['random', 'history']),
   ];

   private generateFact(id: string, value: string, categories: string[]): ChuckNorrisFact {
      return {
         id,
         value,
         icon_url: '',
         url: '',
         catetories: categories,
      };
   }
}
