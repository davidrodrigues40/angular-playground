import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { TeamType } from 'src/app/enums/scorecard-enums';
import { Game } from 'src/app/state/game/game.model';
import { GameActions } from 'src/app/state/game/game.actions';
import * as selectors from 'src/app/state/game/game.selectors';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private _game: Game = {
    home: 0,
    away: 0
  };

  public get homeScore$(): Observable<number> {
    return this._store.select(selectors.getHomeScore);
  };

  public get awayScore$(): Observable<number> {
    return this._store.select(selectors.getAwayScore);
  };

  constructor(private readonly _store: Store<Game>) { }

  public addRunsToTeam(team: TeamType, runs: number): void {
    const func = team === TeamType.home ? GameActions.homeScore : GameActions.awayScore;

    this._store.dispatch(func({ runs: runs }));
  }

  public resetRuns(): void {
    this._store.dispatch(GameActions.resetScore());
  }

  public setScore(home: number, away: number): void {
    const game: Game = { home: home, away: away };
    this._store.dispatch(GameActions.setScores({ game }));
  }

  public getScore$(): Observable<Game> {
    return of(this._game);
  }

}
