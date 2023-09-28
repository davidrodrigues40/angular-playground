import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { BowlingService } from "src/app/services/bowling/bowling.service";
import * as actions from './bowling.actions';

@Injectable()
export class BowlingEffects {
  constructor(private readonly _actions$: Actions,
    private readonly _service: BowlingService) { }

  addPlayer$ = createEffect(() => this._actions$.pipe(
    ofType(actions.BowlingActions.addPlayer),
    mergeMap(action =>
      this._service.addPlayer$(action.payload.name, action.payload.rating, action.payload.players)
        .pipe(
          map(players => actions.BowlingActions.updatePlayersSuccess({ payload: players }))
        ))
  ));

  removePlayer$ = createEffect(() => this._actions$.pipe(
    ofType(actions.BowlingActions.removePlayer),
    mergeMap(action =>
      this._service.removePlayer$(action.payload.id, action.payload.players)
        .pipe(
          map(players => actions.BowlingActions.updatePlayersSuccess({ payload: players }))
        ))
  ));

  bowl$ = createEffect(() => this._actions$.pipe(
    ofType(actions.BowlingActions.bowl),
    mergeMap(action =>
      this._service.bowl$(action.payload)
        .pipe(
          map(game => actions.BowlingActions.bowlSuccess({ payload: game }))
        ))
  ));

  getRatings$ = createEffect(() => this._actions$.pipe(
    ofType(actions.BowlingActions.getRatings),
    mergeMap(() =>
      this._service.getRatings$()
        .pipe(
          map(ratings => actions.BowlingActions.getRatingsSuccess({ payload: ratings }))
        ))
  ));
}