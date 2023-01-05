import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map } from "rxjs";
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

  // addRunsToHome$ = createEffect(() => this._actions$.pipe(
  //   ofType(fromActions.ScoreActions.addRunsToHome),
  //   map(runs => fromActions.ScoreActions.addRunsToHomeSuccess(runs))
  // ));
}