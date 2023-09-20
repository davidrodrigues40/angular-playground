import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, first, map } from 'rxjs';
import { BowlingState } from 'src/app/state/app.state';
import * as actions from 'src/app/state/bowling/bowling.actions';
import * as selectors from 'src/app/state/bowling/bowling.selectors';
import { BowlingGame } from 'src/app/state/bowling/models/bowling-game.model';
import { Player } from 'src/app/state/bowling/models/player.model';
import { BowlerRating } from '../models/bowler-rating.model';

@Component({
  selector: 'app-bowl',
  templateUrl: './bowling-view.component.html',
  styleUrls: ['./bowling-view.component.scss']
})
export class BowlingViewComponent implements OnInit {
  players$: Observable<ReadonlyArray<Player>> = this._store.select(selectors.getPlayers);
  game$: Observable<Readonly<BowlingGame | undefined>> = this._store.select(selectors.getGame);
  ratings$: Observable<ReadonlyArray<BowlerRating>> = this._store.select(selectors.getRatings);

  constructor(private readonly _store: Store<BowlingState>) {
  }

  ngOnInit() {
    this._store.dispatch(actions.BowlingActions.getRatings());
  }

  addPlayer(player: { name: string, rating: number }) {
    this._store.dispatch(actions.BowlingActions.addPlayer({ payload: { name: player.name, rating: player.rating } }));
  }

  removePlayer(playerNumber: number) {
    this._store.dispatch(actions.BowlingActions.removePlayer({ payload: playerNumber }));
  }

  playGame() {
    this._store.select(selectors.getPlayers)
      .pipe(first())
      .subscribe(players => this._store.dispatch(actions.BowlingActions.bowl({ payload: players })));
  }

  getScore$(playerName: string): Observable<number | undefined> {
    return this._store.select(selectors.getScore(playerName));
  }

  getRating$(rating: number): Observable<string> {
    return this._store.select(selectors.getRating(rating)).pipe(map(rating => rating ? rating.value : 'Beginner'));
  }

  newGame() {
    this._store.dispatch(actions.BowlingActions.newGame());
  }
}
