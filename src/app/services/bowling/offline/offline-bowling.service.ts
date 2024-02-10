import { StorageTranscoders } from 'ngx-webstorage-service';
import { Observable, of, throwError } from 'rxjs';
import { RatingsCacheKey } from 'src/app/enums/bowling.enums';
import { Game } from 'src/app/interfaces/models/bowling/game';
import { Player } from 'src/app/interfaces/models/bowling/player';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { Injectable } from '@angular/core';

import { CacheService } from '../../cache/cache.service';
import { IBowlingService } from '../bowling-service.interface';
import { GameService } from './game/game.service';
import { PlayerService } from './player/player.service';

@Injectable()
export class OfflineBowlingService implements IBowlingService
{
   private get ratings(): BowlerRating[]
   {
      return [
         { key: 0, value: 'Beginner' },
         { key: 1, value: 'Intermediate' },
         { key: 2, value: 'Advanced' },
         { key: 3, value: 'Expert' }
      ]
   }

   constructor(private readonly _playerService: PlayerService,
      private readonly _gameService: GameService,
      private readonly _cacheService: CacheService) { }

   bowl$(players: ReadonlyArray<Player>): Observable<Game>
   {
      if (players.length === 0)
         return throwError(() => new Error('No players provided'));

      const bowlers = this._playerService.generateBowlers(players);
      let game: Game = this._gameService.newGame(bowlers);

      return of(this._gameService.playGame(game));
   }

   getRatings$(): Observable<BowlerRating[]>
   {
      if (this._cacheService.localHas(RatingsCacheKey.BowlerRatings))
         return of(this._cacheService.getLocal(RatingsCacheKey.BowlerRatings, StorageTranscoders.JSON) as BowlerRating[]);

      this._cacheService.setLocal(RatingsCacheKey.BowlerRatings, this.ratings, StorageTranscoders.JSON);

      return of(this.ratings);
   }

   getRating(key: number): BowlerRating
   {
      return this.ratings.find(rating => rating.key === key) as BowlerRating;
   }
}
