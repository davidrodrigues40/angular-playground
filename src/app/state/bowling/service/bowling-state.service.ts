import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IStateService } from 'src/app/interfaces/services/state-service.interface';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';
import { BowlingState } from '../../app.state';
import { Event } from '../../common/event';
import * as actions from '../bowling.actions';
import * as selectors from '../bowling.selectors';
import { BowlingGame } from '../models/bowling-game.model';
import { Player } from '../models/player.model';
import { Scorecard } from '../models/scorecard.model';

@Injectable()
export class BowlingStateService implements IStateService {

  constructor(private readonly _store: Store<BowlingState>) { }

  events = {
    _store: this._store,
    getPlayers(): Event<string, Store<BowlingState>> {
      return new Event(actions.BowlingActions.getPlayers(), this._store);
    },
    addPlayer(name: string, rating: number, players: ReadonlyArray<Player>): Event<string, Store<BowlingState>> {
      return new Event(actions.BowlingActions.addPlayer({ payload: { name, rating, players } }), this._store);
    },
    removePlayer(id: number, players: ReadonlyArray<Player>): Event<string, Store<BowlingState>> {
      return new Event(actions.BowlingActions.removePlayer({ payload: { id, players } }), this._store);
    },
    bowl(players: ReadonlyArray<Player>): Event<string, Store<BowlingState>> {
      return new Event(actions.BowlingActions.bowl({ payload: players }), this._store);
    },
    getRatings(): Event<string, Store<BowlingState>> {
      return new Event(actions.BowlingActions.getRatings(), this._store);
    },
    newGame(): Event<string, Store<BowlingState>> {
      return new Event(actions.BowlingActions.newGame(), this._store);
    },
    changeAllPlayersRatings(rating: number, players: ReadonlyArray<Player>): Event<string, Store<BowlingState>> {
      return new Event(actions.BowlingActions.changeAllPlayersRatings({ payload: { rating, players } }), this._store);
    }
  }

  observables = {
    _store: this._store,
    get players$(): Observable<ReadonlyArray<Player>> {
      return this._store.select(selectors.getPlayers);
    },
    get game$(): Observable<BowlingGame | undefined> {
      return this._store.select(selectors.getGame);
    },

    get winner$(): Observable<Scorecard | undefined> {
      return this._store.select(selectors.getWinner);
    },
    get ratings$(): Observable<ReadonlyArray<BowlerRating>> {
      return this._store.select(selectors.getRatings);
    },
    score$(name: string): Observable<number | undefined> {
      return this._store.select(selectors.getScore(name));
    },
    rating$(ratingKey: number): Observable<BowlerRating | undefined> {
      return this._store.select(selectors.getRating(ratingKey));
    }
  }
}
