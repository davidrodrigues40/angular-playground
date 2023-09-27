import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';
import { BowlingGame } from 'src/app/state/bowling/models/bowling-game.model';
import { Player } from 'src/app/state/bowling/models/player.model';

@Injectable()
export class BowlingService {
  #base_url = 'https://localhost:7067';
  #ratings?: BowlerRating[];

  constructor(private readonly _httpClient: HttpClient,) { }

  bowl$(players: ReadonlyArray<Player>): Observable<BowlingGame> {
    return this._httpClient.post<BowlingGame>(`${this.#base_url}/api/game-rated`, players);
  }

  getRatings$(): Observable<BowlerRating[]> {
    if (this.#ratings) return of(this.#ratings);

    return this._httpClient.get<BowlerRating[]>(`${this.#base_url}/api/ratings`, {})
      .pipe(map(ratings => this.#ratings = ratings));
  }

  getRating$(ratingKey: number): Observable<BowlerRating | undefined> {
    if (this.#ratings) return of(this.#ratings.find(rating => rating.key === ratingKey));

    return this.getRatings$()
      .pipe(
        map(ratings => ratings.find(rating => rating.key === ratingKey)));
  }
}
