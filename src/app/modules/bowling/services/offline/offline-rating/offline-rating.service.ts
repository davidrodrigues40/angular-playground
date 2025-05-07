import { Observable, of } from 'rxjs';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';
import { CacheService } from 'src/app/services/cache/cache.service';

import { Injectable } from '@angular/core';

import { BaseRatingService } from '../../../services/rating-service.base';

@Injectable()
export class OfflineRatingService extends BaseRatingService {
   public get ratings(): BowlerRating[] {
      return [
         { key: 0, value: 'Beginner' },
         { key: 1, value: 'Intermediate' },
         { key: 2, value: 'Advanced' },
         { key: 3, value: 'Expert' }
      ]
   }

   constructor(private readonly _cacheService: CacheService) { super(); }

   getRatings$(): Observable<BowlerRating[]> {
      return of(this.ratings);
   }

   getRating(key: number): BowlerRating {
      return this.ratings.find(rating => rating.key === key) as BowlerRating;
   }
}
