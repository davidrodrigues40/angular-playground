import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';
import { BowlingState } from '../../app.state';
import * as actions from '../bowling.actions';
import * as selectors from '../bowling.selectors';
import { BowlingGame } from '../models/bowling-game.model';
import { Player } from '../models/player.model';
import { Scorecard } from '../models/scorecard.model';

@Injectable()
export class BowlingStateService {

  constructor(private readonly _store: Store<BowlingState>) { }

  addPlayer(name: string, rating: number, players: ReadonlyArray<Player>): void {
    this._store.dispatch(actions.BowlingActions.addPlayer({ payload: { name, rating, players } }));
  }

  removePlayer(id: number, players: ReadonlyArray<Player>): void {
    this._store.dispatch(actions.BowlingActions.removePlayer({ payload: { id, players } }));
  }

  bowl(players: ReadonlyArray<Player>): void {
    this._store.dispatch(actions.BowlingActions.bowl({ payload: players }));
  }

  getRatings(): void {
    this._store.dispatch(actions.BowlingActions.getRatings());
  }

  newGame(): void {
    this._store.dispatch(actions.BowlingActions.newGame());
  }

  get players$(): Observable<ReadonlyArray<Player>> {
    return this._store.select(selectors.getPlayers);
  }

  get game$(): Observable<BowlingGame | undefined> {
    return this._store.select(selectors.getGame);
  }

  get winner$(): Observable<Scorecard | undefined> {
    return this._store.select(selectors.getWinner);
  }

  get ratings$(): Observable<ReadonlyArray<BowlerRating>> {
    return this._store.select(selectors.getRatings);
  }

  getScore$(name: string): Observable<number | undefined> {
    return this._store.select(selectors.getScore(name));
  }

  getRating$(ratingKey: number): Observable<BowlerRating | undefined> {
    return this._store.select(selectors.getRating(ratingKey));
  }
}
