import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ChuckNorrisFact } from 'src/app/state/chuck-norris/models/chuck-norris-fact';
import { FactCategory } from 'src/app/state/chuck-norris/models/fact-category';

@Injectable({
  providedIn: 'root'
})
export class ChuckNorrisFactsService {
  private readonly _url: string = 'https://api.chucknorris.io/jokes';

  constructor(private readonly http: HttpClient) { }

  getFact$(): Observable<Readonly<ChuckNorrisFact>> {
    return this.http.get<ChuckNorrisFact>(`${this._url}/random`);
  }

  getFactForCategory$(category: FactCategory): Observable<Readonly<ChuckNorrisFact>> {
    if (category.category === 'random')
      return this.getFact$();

    return this.http.get<ChuckNorrisFact>(`${this._url}/random?category=${category.category}`);
  }

  getCategories$(): Observable<ReadonlyArray<FactCategory>> {
    return this.http.get<string[]>(`${this._url}/categories`)
      .pipe(
        map(arr => {
          arr.unshift('random');
          return arr.map(a => { return { category: a }; });
        })
      )
  }
}
