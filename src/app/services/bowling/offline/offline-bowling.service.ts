import { Game } from 'src/app/interfaces/models/bowling/game';
import { Player } from 'src/app/interfaces/models/bowling/player';

import { inject, Injectable } from '@angular/core';

import { GameService } from './game/game.service';
import { OfflineRatingService } from './offline-rating/offline-rating.service';
import { PlayerService } from './player/player.service';
import { BowlingServiceAbstract } from '../bowling-service.abstract';
import { BowlingState } from 'src/app/state/bowling.state';

@Injectable()
export class OfflineBowlingService extends BowlingServiceAbstract implements BowlingServiceAbstract {

   private readonly _playerService: PlayerService = inject(PlayerService);
   private readonly _ratingService: OfflineRatingService = inject(OfflineRatingService);
   private readonly _gameService: GameService = inject(GameService);

   bowl(players: ReadonlyArray<Player>): void {
      if (players.length === 0)
         throw new Error('No players provided');

      const bowlers = this._playerService.generateBowlers(players);

      let game: Game = this._gameService.newGame(bowlers);
      game = this._gameService.playGame(game);

      BowlingState.game.set(game);
      BowlingState.players.set(players);
   }

   getRatings(): void {
      BowlingState.ratings.set(this._ratingService.ratings);
   }
}
