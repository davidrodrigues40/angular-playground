import { Observable } from 'rxjs';
import { IStateService } from 'src/app/interfaces/services/state-service.interface';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { StateEvent } from '../../common/state-event';
import * as actions from '../chuck-norris.actions';
import * as selectors from '../chuck-norris.selectors';
import { ChuckNorrisFactState } from '../chuck-norris.state';
import { ChuckNorrisFact } from '../models/chuck-norris-fact';
import { FactCategory } from '../models/fact-category';

@Injectable()
export class ChuckNorrisStateService implements IStateService
{

    constructor(private readonly _store: Store<ChuckNorrisFactState>) { }

    events = {
        _store: this._store,
        fetchFact(): StateEvent<string, Store<ChuckNorrisFactState>>
        {
            return new StateEvent(actions.factActions.getFact(), this._store);
        },

        fetchFactForCategory(category: FactCategory): StateEvent<string, Store<ChuckNorrisFactState>>
        {
            return new StateEvent(actions.factActions.getFactForCategory({ payload: category }), this._store);
        },

        fetchCategories(): StateEvent<string, Store<ChuckNorrisFactState>>
        {
            return new StateEvent(actions.categoryActions.getAll(), this._store);
        },

        setSelectedCategory(category: FactCategory): StateEvent<string, Store<ChuckNorrisFactState>>
        {
            return new StateEvent(actions.categoryActions.categorySelected({ payload: category }), this._store);
        }
    };

    observables = {
        _store: this._store,
        get fact$(): Observable<Readonly<ChuckNorrisFact>>
        {
            return this._store.select(selectors.getFact);
        },

        get categories$(): Observable<ReadonlyArray<FactCategory>>
        {
            return this._store.select(selectors.getCategories);
        },

        get selectedCategory$(): Observable<Readonly<FactCategory | undefined>>
        {
            return this._store.select(selectors.getSelectedCategory);
        }
    }
}
