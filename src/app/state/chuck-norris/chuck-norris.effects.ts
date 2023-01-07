import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { ChuckNorrisFactsService } from "src/app/services/chuck-norris/chuck-norris-facts.service";
import * as actions from './chuck-norris.actions';

@Injectable()
export class ChuckNorrisEffects {
  constructor(private readonly _actions$: Actions,
    private readonly _service: ChuckNorrisFactsService) { }

  getFact$ = createEffect(() => this._actions$.pipe(
    ofType(actions.factActions.getFact),
    mergeMap(() =>
      this._service.getFact$()
        .pipe(
          map(fact => actions.factActions.getFactSuccess({ payload: fact })),
          catchError(error => of(actions.factActions.getFactFailed({ payload: error })))
        )
    )
  ));

  getFactForCategory$ = createEffect(() => this._actions$.pipe(
    ofType(actions.factActions.getFactForCategory),
    mergeMap(action =>
      this._service.getFactForCategory$(action.payload)
        .pipe(
          map(fact => actions.factActions.getFactSuccess({ payload: fact })),
          catchError(error => of(actions.factActions.getFactFailed({ payload: error })))
        )
    )
  ));

  getCategories$ = createEffect(() => this._actions$.pipe(
    ofType(actions.categoryActions.getAll),
    mergeMap(() =>
      this._service.getCategories$()
        .pipe(
          map(categories => actions.categoryActions.getAllSuccess({ payload: categories }))
        ))
  ));

  categorySelected$ = createEffect(() => this._actions$.pipe(
    ofType(actions.categoryActions.categorySelected),
    map(action => actions.categoryActions.catetorySelectedSuccess(action))
  ));
}