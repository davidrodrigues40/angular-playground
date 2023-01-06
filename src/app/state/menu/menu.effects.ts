import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { MenuService } from "src/app/services/menu/menu.service";
import * as actions from './menu.actions';

@Injectable()
export class MenuEffects {
  constructor(private readonly _actions$: Actions,
    private readonly _service: MenuService) { }

  getMenu$ = createEffect(() => this._actions$.pipe(
    ofType(actions.menuActions.getAll),
    mergeMap(() =>
      this._service.getAll$()
        .pipe(
          map(menu => actions.menuActions.getAllSuccess({ payload: menu }))
        )
    )
  ));

}