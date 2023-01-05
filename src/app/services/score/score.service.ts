import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Game } from 'src/app/state/game/game.model';

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
