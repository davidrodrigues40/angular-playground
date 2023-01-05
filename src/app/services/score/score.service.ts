import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { TeamType } from 'src/app/enums/scorecard-enums';
import { Game } from 'src/app/state/game/game.model';
import { GameActions } from 'src/app/state/game/game.actions';
import * as selectors from 'src/app/state/game/game.selectors';
import { GameState } from 'src/app/state/app.state';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private _game: Game = {
    home: 0,
    away: 0
  };

  constructor(private readonly _store: Store<Game>) { }

  public getScore$(): Observable<Game> {
    return of(this._game);
  }

  public addRunsToHome$(runs: number): Observable<number> {
    return of(runs);
  }

  public addRunsToAway$(runs: number): Observable<number> {
    return of(runs);
  }

  public resetScore$(): Observable<Game> {
    return of(this._game);
  }

  public setScores$(game: Game): Observable<Game> {
    return of(game);
  }

}
