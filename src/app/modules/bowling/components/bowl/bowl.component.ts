import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, first, map } from 'rxjs';
import { BowlingState } from 'src/app/state/app.state';
import * as actions from 'src/app/state/bowling/bowling.actions';
import * as selectors from 'src/app/state/bowling/bowling.selectors';
import { BowlingGame } from 'src/app/state/bowling/models/bowling-game.model';
import { Player } from 'src/app/state/bowling/models/player.model';

@Component({
  selector: 'app-bowl',
  templateUrl: './bowl.component.html',
  styleUrls: ['./bowl.component.scss']
})
export class BowlComponent {
  players$: Observable<ReadonlyArray<Player>> = this._store.select(selectors.getPlayers);
  game$: Observable<Readonly<BowlingGame>> = this._store.select(selectors.getGame);

  playerName: string = '';

  constructor(private readonly _store: Store<BowlingState>) {
  }

  addPlayer() {
    this._store.dispatch(actions.BowlingActions.addPlayer({ payload: this.playerName }));
    this.playerName = '';
  }

  removePlayer(playerNumber: number) {
    this._store.dispatch(actions.BowlingActions.removePlayer({ payload: playerNumber }));
  }

  startGame() {
    this._store.select(selectors.getPlayers)
      .pipe(first())
      .subscribe(players => this._store.dispatch(actions.BowlingActions.bowl({ payload: players })));
  }

  getScore$(playerName: string): Observable<number | undefined> {
    return this.game$
      .pipe(
        map(game => game.bowlers.find(b => b.name === playerName)?.score))
  }
}
