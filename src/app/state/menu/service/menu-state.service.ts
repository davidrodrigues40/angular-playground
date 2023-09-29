import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IStateService } from 'src/app/interfaces/services/state-service.interface';
import { MenuState } from '../../app.state';
import { Event } from '../../common/event';
import * as actions from '../menu.actions';
import * as selectors from '../menu.selectors';
import { MenuItem } from '../models/menu-item';

@Injectable()
export class MenuStateService implements IStateService {

  constructor(private readonly _store: Store<MenuState>) { }

  events = {
    _store: this._store,
    fetchMenu(): Event<string, Store<MenuState>> {
      return new Event(actions.menuActions.getAll(), this._store);
    }
  }

  observables = {
    _store: this._store,
    get menu$(): Observable<ReadonlyArray<MenuItem>> {
      return this._store.select(selectors.getMenu);
    }
  };
}
