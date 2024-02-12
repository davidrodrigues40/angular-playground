import { Observable, of, throwError } from 'rxjs';
import { Game } from 'src/app/interfaces/models/bowling/game';
import { Player } from 'src/app/interfaces/models/bowling/player';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { Injectable } from '@angular/core';

import { IBowlingService } from '../bowling-service.interface';
import { GameService } from './game/game.service';
import { OfflineRatingService } from './offline-rating/offline-rating.service';
import { PlayerService } from './player/player.service';

@Injectable()
export class OfflineBowlingService implements IBowlingService
{

   constructor(private readonly _playerService: PlayerService,
      private readonly _ratingService: OfflineRatingService,
      private readonly _gameService: GameService,) { }

   bowl$(players: ReadonlyArray<Player>): Observable<Game>
   {
      if (players.length === 0)
         return throwError(() => new Error('No players provided'));

      const bowlers = this._playerService.generateBowlers(players);

      let game: Game = this._gameService.newGame(bowlers);
      game = this._gameService.playGame(game);

      return of(game);
   }

   getRatings$(): Observable<BowlerRating[]>
   {
      return of(this._ratingService.ratings);
   }
}
