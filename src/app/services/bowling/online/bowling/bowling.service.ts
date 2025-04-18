import { Observable } from 'rxjs';
import { Game } from 'src/app/interfaces/models/bowling/game';
import { Player } from 'src/app/interfaces/models/bowling/player';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { RatingService } from '../rating/rating.service';
import { BowlingServiceAbstract } from '../../bowling-service.abstract';
import { BowlingState } from 'src/app/state/bowling.state';

@Injectable()
export class BowlingService extends BowlingServiceAbstract implements BowlingServiceAbstract {
   private readonly base_url = 'https://localhost:7067';
   private readonly ratingService: RatingService = inject(RatingService);
   private readonly _httpClient: HttpClient = inject(HttpClient);

   private bowl$(players: ReadonlyArray<Player>): Observable<Game> {
      return this._httpClient.post<Game>(`${this.base_url}/api/game`, players);
   }

   private getRatings$(): Observable<BowlerRating[]> {
      return this.ratingService.getRatings$();
   }

   bowl(players: ReadonlyArray<Player>): void {
      this.bowl$(players)
         .subscribe(game => {
            BowlingState.game.set(game);
            BowlingState.players.set(players);
         });
   }

   getRatings(): void {
      this.getRatings$()
         .subscribe(ratings => {
            BowlingState.ratings.set(ratings);
         });
   }
}
