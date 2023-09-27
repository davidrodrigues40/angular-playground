import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChuckNorrisFactState } from '../../app.state';
import * as actions from '../chuck-norris.actions';
import * as selectors from '../chuck-norris.selectors';
import { ChuckNorrisFact } from '../models/chuck-norris-fact';
import { FactCategory } from '../models/fact-category';

@Injectable({
  providedIn: 'root'
})
export class ChuckNorrisStateService {

  constructor(private readonly _store: Store<ChuckNorrisFactState>) { }

  fetchFact$(): void {
    console.log('fetching');
    this._store.dispatch(actions.factActions.getFact());
  }

  fetchFactForCategory$(category: FactCategory): void {
    this._store.dispatch(actions.factActions.getFactForCategory({ payload: category }));
  }

  fetchCategories$(): void {
    this._store.dispatch(actions.categoryActions.getAll());
  }

  setSelectedCategory$(category: FactCategory): void {
    console.log('setting category', category);
    this._store.dispatch(actions.categoryActions.categorySelected({ payload: category }));
  }

  get fact$(): Observable<Readonly<ChuckNorrisFact>> {
    return this._store.select(selectors.getFact);
  }

  get categories$(): Observable<ReadonlyArray<FactCategory>> {
    return this._store.select(selectors.getCategories);
  }

  get selectedCategory$(): Observable<Readonly<FactCategory | undefined>> {
    return this._store.select(selectors.getSelectedCategory);
  }
}
