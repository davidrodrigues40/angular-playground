import { Observable } from 'rxjs';
import { IStateService } from 'src/app/interfaces/services/state-service.interface';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Game } from '../../../interfaces/models/bowling/game';
import { Player } from '../../../interfaces/models/bowling/player';
import { Scorecard } from '../../../interfaces/models/bowling/scorecard';
import * as actions from '../bowling.actions';
import * as selectors from '../bowling.selectors';
import { BowlingState } from '../bowling.state';

@Injectable()
export class BowlingStateService implements IStateService
{

   constructor(private readonly _store: Store<BowlingState>) { }
   effects = {
   };
   events = {
      _store: this._store,
      getPlayers(): void
      {
         this._store.dispatch(actions.BowlingActions.getPlayers());
      },
      addPlayer(name: string, rating: number, players: ReadonlyArray<Player>): void
      {
         this._store.dispatch(actions.BowlingActions.addPlayer({ payload: { name, rating, players } }));
      },
      removePlayer(id: number, players: ReadonlyArray<Player>): void
      {
         this._store.dispatch(actions.BowlingActions.removePlayer({ payload: { id, players } }));
      },
      bowl(players: ReadonlyArray<Player>): void
      {
         this._store.dispatch(actions.BowlingActions.bowl({ payload: players }));
      },
      getRatings(): void
      {
         this._store.dispatch(actions.BowlingActions.getRatings());
      },
      newGame(): void
      {
         this._store.dispatch(actions.BowlingActions.newGame());
      },
      changeAllPlayersRatings(rating: number, players: ReadonlyArray<Player>): void
      {
         return this._store.dispatch(actions.BowlingActions.changeAllPlayersRatings({ payload: { rating, players } }));
      }
   };

   observables = {
      _store: this._store,
      get players$(): Observable<ReadonlyArray<Player>>
      {
         return this._store.select(selectors.getPlayers);
      },
      get game$(): Observable<Game | undefined>
      {
         return this._store.select(selectors.getGame);
      },

      get winner$(): Observable<Scorecard | undefined>
      {
         return this._store.select(selectors.getWinner);
      },
      get ratings$(): Observable<ReadonlyArray<BowlerRating>>
      {
         return this._store.select(selectors.getRatings);
      },
      score$(name: string): Observable<number | undefined>
      {
         return this._store.select(selectors.getScore(name));
      },
      rating$(ratingKey: number): Observable<BowlerRating | undefined>
      {
         return this._store.select(selectors.getRating(ratingKey));
      }
   }
}
