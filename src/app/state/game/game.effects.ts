import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, switchMap, filter } from "rxjs";
import { ScoreService } from "src/app/services/score/score.service";
import * as actions from './game.actions';

@Injectable()
export class GameEffects {
  constructor(private readonly _actions$: Actions,
    private readonly _service: ScoreService) { }

  getGame$ = createEffect(() => this._actions$.pipe(
    ofType(actions.GameActions.getScore),
    mergeMap(() =>
      this._service.getScore$()
        .pipe(
          map(game => actions.GameActions.getScoreSuccess({ payload: game }))
        )
    )
  ));

  addRunsToHome$ = createEffect(() => this._actions$.pipe(
    ofType(actions.GameActions.addRunsToHome),
    map(action => action.payload),
    filter(runs => !isNaN(runs)),
    switchMap(runs => this._service.addRunsToHome$(runs)
      .pipe(
        map(runs => actions.GameActions.addRunsToHomeSuccess({ payload: runs }))
      )
    )
  ));

  addRunsToAway$ = createEffect(() => this._actions$.pipe(
    ofType(actions.GameActions.addRunsToAway),
    map(action => action.payload),
    filter(runs => !isNaN(runs)),
    switchMap(runs => this._service.addRunsToAway$(runs)
      .pipe(
        map(runs => actions.GameActions.addRunsToAwaySuccess({ payload: runs }))
      )
    )
  ));

  resetScore$ = createEffect(() => this._actions$.pipe(
    ofType(actions.GameActions.resetScore),
    switchMap(_ => this._service.resetScore$()
      .pipe(
        map(_ => actions.GameActions.resetScoreSuccess())
      ))
  ));

  setScores$ = createEffect(() => this._actions$.pipe(
    ofType(actions.GameActions.setScores),
    map(action => action.payload),
    switchMap(game => this._service.setScores$(game)
      .pipe(
        map(game => actions.GameActions.setScoresSuccess({ payload: game }))
      ))
  ));
}