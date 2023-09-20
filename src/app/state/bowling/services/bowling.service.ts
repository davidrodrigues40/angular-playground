import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, first, map, of } from 'rxjs';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';
import { BowlingState } from '../../app.state';
import * as selectors from '../bowling.selectors';
import { BowlingGame } from '../models/bowling-game.model';
import { Player } from '../models/player.model';

@Injectable()
export class BowlingService {
  #base_url = 'https://localhost:7067';

  constructor(private readonly _httpClient: HttpClient, private readonly _store: Store<BowlingState>) { }

  bowl$(players: ReadonlyArray<Player>): Observable<BowlingGame> {
    return this._httpClient.post<BowlingGame>(`${this.#base_url}/api/game-rated`, players);
  }

  addPlayer$(name: string, rating: number): Observable<ReadonlyArray<Player>> {
    return this._store.select(selectors.getPlayers)
      .pipe(
        first(),
        map(players => {
          const nextNumber = players.length + 1;

          return [...players, { number: nextNumber, name, rating }];
        }),
      );
  }

  removePlayer$(playerNumber: number): Observable<ReadonlyArray<Player>> {
    return this._store.select(selectors.getPlayers)
      .pipe(
        first(),
        map(players => {
          let newList: Player[] = [];
          players.filter(player => player.number !== playerNumber).forEach((player, index) => newList.push({ number: index + 1, name: player.name, rating: player.rating }));

          return newList;
        }),
      );
  }

  getRatings$(): Observable<BowlerRating[]> {
    return of([
      { key: 0, value: 'Beginner' },
      { key: 1, value: 'Intermediate' },
      { key: 2, value: 'Semi-Pro' },
      { key: 3, value: 'Pro' }
    ]);
  }

  getRating$(ratingKey: number): Observable<BowlerRating | undefined> {
    return this.getRatings$()
      .pipe(
        map(ratings => ratings.find(rating => rating.key === ratingKey)));
  }
}
