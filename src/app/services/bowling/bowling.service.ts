import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';
import { BowlingGame } from 'src/app/state/bowling/models/bowling-game.model';
import { Player } from 'src/app/state/bowling/models/player.model';
import { ApiService } from '../api.service';

@Injectable()
export class BowlingService extends ApiService {
  private _ratings?: BowlerRating[];

  constructor(private readonly _httpClient: HttpClient,) { super(); }

  bowl$(players: ReadonlyArray<Player>): Observable<BowlingGame> {
    return this._httpClient.post<BowlingGame>(`${this.base_url}/api/game-rated`, players);
  }

  getRatings$(): Observable<BowlerRating[]> {
    if (this._ratings) return of(this._ratings);

    return this._httpClient.get<BowlerRating[]>(`${this.base_url}/api/ratings`, {})
      .pipe(map(ratings => this._ratings = ratings));
  }

  getRating$(ratingKey: number): Observable<BowlerRating | undefined> {
    if (this._ratings) return of(this._ratings.find(rating => rating.key === ratingKey));

    return this.getRatings$()
      .pipe(
        map(ratings => ratings.find(rating => rating.key === ratingKey)));
  }

  addPlayer$(name: string, rating: number, players: ReadonlyArray<Player>): Observable<ReadonlyArray<Player>> {
    const nextNumber = players.length + 1;

    return of([...players, { number: nextNumber, name, rating }]);
  }

  removePlayer$(playerNumber: number, players: ReadonlyArray<Player>): Observable<ReadonlyArray<Player>> {
    let newList: Player[] = [];
    players.filter(player => player.number !== playerNumber).forEach((player, index) => newList.push({ number: index + 1, name: player.name, rating: player.rating }));

    return of(newList);
  }
}
