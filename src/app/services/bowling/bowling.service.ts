import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageTranscoders } from 'ngx-webstorage-service';
import { Observable, map, of } from 'rxjs';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';
import { BowlingGame } from 'src/app/state/bowling/models/bowling-game.model';
import { Player } from 'src/app/state/bowling/models/player.model';
import { ApiService } from '../api.service';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class BowlingService extends ApiService {
  private _ratings?: BowlerRating[];

  constructor(private readonly _httpClient: HttpClient,
    private readonly _cacheService: CacheService) { super(); }

  bowl$(players: ReadonlyArray<Player>): Observable<BowlingGame> {
    return this._httpClient.post<BowlingGame>(`${this.base_url}/api/game`, players);
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
}
