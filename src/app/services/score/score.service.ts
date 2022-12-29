import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { TeamType } from 'src/app/enums/scorecard-enums';
import { Game } from 'src/app/state/game/game.model';
import { ScoreActions } from 'src/app/state/game/scoreboard-page.actions';
import { selectScore } from 'src/app/state/game/scoreboard.selector';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  public get homeScore$(): Observable<number> {
    return this._store.select(selectScore).pipe(map(score => score.home));
  };

  public get awayScore$(): Observable<number> {
    return this._store.select(selectScore).pipe(map(score => score.away));
  };

  constructor(private readonly _store: Store<Game>) { }

  public addRunsToTeam(team: TeamType, runs: number): void {
    const func = team === TeamType.home ? ScoreActions.homeScore : ScoreActions.awayScore;

    this._store.dispatch(func({ runs: runs }));
  }

  public resetRuns(): void {
    this._store.dispatch(ScoreActions.resetScore());
  }

}
