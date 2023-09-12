import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import * as actions from './bowling.actions';
import { BowlingService } from "./services/bowling.service";

@Injectable()
export class BowlingEffects {
  constructor(private readonly _actions$: Actions,
    private readonly _service: BowlingService) { }

  addPlayer$ = createEffect(() => this._actions$.pipe(
    ofType(actions.BowlingActions.addPlayer),
    mergeMap(action =>
      this._service.addPlayer$(action.payload)
        .pipe(
          map(players => actions.BowlingActions.updatePlayersSuccess({ payload: players }))
        ))
  ));

  removePlayer$ = createEffect(() => this._actions$.pipe(
    ofType(actions.BowlingActions.removePlayer),
    mergeMap(action =>
      this._service.removePlayer$(action.payload)
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
}