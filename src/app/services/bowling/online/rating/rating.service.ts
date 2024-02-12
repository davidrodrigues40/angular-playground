import { StorageTranscoders } from 'ngx-webstorage-service';
import { map, Observable, of } from 'rxjs';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CacheService } from '../../../cache/cache.service';
import { BaseRatingService } from '../../rating-service.base';

@Injectable()
export class RatingService extends BaseRatingService
{
   constructor(private readonly _httpClient: HttpClient,
      private readonly _cacheService: CacheService) { super(); }

   getRatings$(): Observable<BowlerRating[]>
   {
      if (this._cacheService.localHas(this._ratingsCacheKey))
         return of(this._cacheService.getLocal(this._ratingsCacheKey, StorageTranscoders.JSON) as BowlerRating[]);

      return this._httpClient.get<BowlerRating[]>(`${this.base_url}/api/ratings`, {})
         .pipe(map(ratings =>
         {
            this._cacheService.setLocal(this._ratingsCacheKey, ratings, StorageTranscoders.JSON);
            return ratings;
         }));
   }
}
