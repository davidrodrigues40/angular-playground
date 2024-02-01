import { Observable } from 'rxjs';
import { IStateService } from 'src/app/interfaces/services/state-service.interface';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { StateEvent } from '../../common/state-event';
import { MenuItem } from '../../menu/models/menu-item';
import * as actions from '../home-menu.actions';
import * as selectors from '../home-menu.selectors';
import { HomeMenuState } from '../home-menu.state';

@Injectable()
export class HomeMenuStateService implements IStateService
{
    constructor(private readonly _store: Store<HomeMenuState>) { }
    events = {
        _store: this._store,
        fetchMenu(): StateEvent<string, Store<HomeMenuState>>
        {
            return new StateEvent(actions.homeMenuActions.getHomeMenu(), this._store);
        }
    };
    observables = {
        _store: this._store,
        get menu$(): Observable<ReadonlyArray<MenuItem>>
        {
            return this._store.select(selectors.getMenu);
        }
    };
}
