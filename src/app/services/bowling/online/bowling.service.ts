import { StorageTranscoders } from 'ngx-webstorage-service';
import { map, Observable, of } from 'rxjs';
import { Game } from 'src/app/interfaces/models/bowling/game';
import { Player } from 'src/app/interfaces/models/bowling/player';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiService } from '../../api.service';
import { CacheService } from '../../cache/cache.service';
import { IBowlingService } from '../bowling-service.interface';

@Injectable()
export class BowlingService extends ApiService implements IBowlingService
{
   private readonly _ratingsCacheKey: string = 'bowler-ratings';

   constructor(private readonly _httpClient: HttpClient,
      private readonly _cacheService: CacheService) { super(); }

   bowl$(players: ReadonlyArray<Player>): Observable<Game>
   {
      return this._httpClient.post<Game>(`${this.base_url}/api/game`, players);
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
