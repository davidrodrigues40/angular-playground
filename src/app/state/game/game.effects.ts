import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, switchMap } from "rxjs";
import { ScoreService } from "src/app/services/score/score.service";
import * as fromActions from './game.actions';

@Injectable()
export class GameEffects {
  constructor(private readonly _actions$: Actions,
    private readonly _service: ScoreService) { }

  getGame$ = createEffect(() => this._actions$.pipe(
    ofType(fromActions.GameActions.getScore),
    mergeMap(() =>
      this._service.getScore$()
        .pipe(
          map(game => fromActions.GameActions.getScoreSuccess({ payload: game }))
        )
    )
  ));

  addRunsToHome$ = createEffect(() => this._actions$.pipe(
    ofType(fromActions.GameActions.addRunsToHome),
    map(action => action.payload),
    switchMap(runs => this._service.addRunsToHome$(runs)
      .pipe(
        map(runs => fromActions.GameActions.addRunsToHomeSuccess({ payload: runs }))
      )
    )
  ));

  addRunsToAway$ = createEffect(() => this._actions$.pipe(
    ofType(fromActions.GameActions.addRunsToAway),
    map(action => action.payload),
    switchMap(runs => this._service.addRunsToAway$(runs)
      .pipe(
        map(runs => fromActions.GameActions.addRunsToAwaySuccess({ payload: runs }))
      )
    )
  ));

  resetScore$ = createEffect(() => this._actions$.pipe(
    ofType(fromActions.GameActions.resetScore),
    switchMap(_ => this._service.resetScore$()
      .pipe(
        map(_ => fromActions.GameActions.resetScoreSuccess())
      ))
  ));

  setScores$ = createEffect(() => this._actions$.pipe(
    ofType(fromActions.GameActions.setScores),
    map(action => action.payload),
    switchMap(game => this._service.setScores$(game)
      .pipe(
        map(game => fromActions.GameActions.setScoresSuccess({ payload: game }))
      ))
  ));
}