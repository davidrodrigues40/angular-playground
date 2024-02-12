import { Observable } from 'rxjs';
import { Game } from 'src/app/interfaces/models/bowling/game';
import { Player } from 'src/app/interfaces/models/bowling/player';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiService } from '../../../api.service';
import { IBowlingService } from '../../bowling-service.interface';
import { RatingService } from '../rating/rating.service';

@Injectable()
export class BowlingService extends ApiService implements IBowlingService
{

   constructor(
      private ratingService: RatingService,
      private readonly _httpClient: HttpClient,) { super(); }

   bowl$(players: ReadonlyArray<Player>): Observable<Game>
   {
      return this._httpClient.post<Game>(`${this.base_url}/api/game`, players);
   }

   getRatings$(): Observable<BowlerRating[]>
   {
      return this.ratingService.getRatings$();
   }
}
