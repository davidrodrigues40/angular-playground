import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Game } from '../state/game/game.model';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent {
  constructor(private readonly _store: Store<Game>) { }

  public get homeScore$(): Observable<number> {
    return this._store.select(g => g.home);
  };

  public get awayScore$(): Observable<number> {
    return this._store.select(g => g.away);
  };

  public addHomeScore(): void {

  }

}
