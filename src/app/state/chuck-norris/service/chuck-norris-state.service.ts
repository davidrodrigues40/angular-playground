import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IStateService } from 'src/app/interfaces/services/state-service.interface';
import { ChuckNorrisFactState } from '../../app.state';
import { Event } from '../../common/event';
import * as actions from '../chuck-norris.actions';
import * as selectors from '../chuck-norris.selectors';
import { ChuckNorrisFact } from '../models/chuck-norris-fact';
import { FactCategory } from '../models/fact-category';

@Injectable()
export class ChuckNorrisStateService implements IStateService {

  constructor(private readonly _store: Store<ChuckNorrisFactState>) { }

  events = {
    _store: this._store,
    fetchFact(): Event<string, Store<ChuckNorrisFactState>> {
      return new Event(actions.factActions.getFact(), this._store);
    },

    fetchFactForCategory(category: FactCategory): Event<string, Store<ChuckNorrisFactState>> {
      return new Event(actions.factActions.getFactForCategory({ payload: category }), this._store);
    },

    fetchCategories(): Event<string, Store<ChuckNorrisFactState>> {
      return new Event(actions.categoryActions.getAll(), this._store);
    },

    setSelectedCategory(category: FactCategory): Event<string, Store<ChuckNorrisFactState>> {
      return new Event(actions.categoryActions.categorySelected({ payload: category }), this._store);
    }
  };

  observables = {
    _store: this._store,
    get fact$(): Observable<Readonly<ChuckNorrisFact>> {
      return this._store.select(selectors.getFact);
    },

    get categories$(): Observable<ReadonlyArray<FactCategory>> {
      return this._store.select(selectors.getCategories);
    },

    get selectedCategory$(): Observable<Readonly<FactCategory | undefined>> {
      return this._store.select(selectors.getSelectedCategory);
    }
  }
}
