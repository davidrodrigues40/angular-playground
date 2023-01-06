import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuState } from 'src/app/state/app.state';
import { MenuItem } from 'src/app/state/menu/models/menu-item';
import * as selectors from 'src/app/state/menu/menu.selectors';
import * as actions from 'src/app/state/menu/menu.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public items$: Observable<ReadonlyArray<MenuItem>> = this._store.select(selectors.getFact);

  constructor(private readonly _store: Store<MenuState>) { }

  ngOnInit(): void {
    this._store.dispatch(actions.menuActions.getAll());
  }
}
