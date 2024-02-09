import { StorageTranscoders } from 'ngx-webstorage-service';
import { map, Observable, of } from 'rxjs';
import { BowlingGame } from 'src/app/interfaces/models/bowling/bowling-game';
import { Player } from 'src/app/interfaces/models/bowling/player';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiService } from '../api.service';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class BowlingService extends ApiService
{
   private readonly _ratingsCacheKey: string = 'bowler-ratings';
   private _ratings: BowlerRating[] = this._cacheService.getLocal(this._ratingsCacheKey, StorageTranscoders.JSON) as BowlerRating[] || [];

   constructor(private readonly _httpClient: HttpClient,
      private readonly _cacheService: CacheService) { super(); }

   bowl$(players: ReadonlyArray<Player>): Observable<BowlingGame>
   {
      return this._httpClient.post<BowlingGame>(`${this.base_url}/api/game`, players);
   }

   getRatings$(): Observable<BowlerRating[]>
   {
      if (this._cacheService.localHas(this._ratingsCacheKey)) return of(this._cacheService.getLocal(this._ratingsCacheKey, StorageTranscoders.JSON) as BowlerRating[]);

      return this._httpClient.get<BowlerRating[]>(`${this.base_url}/api/ratings`, {})
         .pipe(map(ratings =>
         {
            this._cacheService.setLocal(this._ratingsCacheKey, ratings, StorageTranscoders.JSON);
            return ratings;
         }));
   }
}
