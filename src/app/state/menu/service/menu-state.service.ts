import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MenuState } from '../../app.state';
import * as actions from '../menu.actions';
import * as selectors from '../menu.selectors';
import { MenuItem } from '../models/menu-item';

@Injectable()
export class MenuStateService {

  constructor(private readonly _store: Store<MenuState>) { }

  fetchMenu$(): void {
    this._store.dispatch(actions.menuActions.getAll());
  }

  get menu$(): Observable<ReadonlyArray<MenuItem>> {
    return this._store.select(selectors.getMenu);
  }
}
