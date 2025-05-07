import { inject, Injectable } from '@angular/core';

import { GameService } from './game/game.service';
import { OfflineRatingService } from './offline-rating/offline-rating.service';
import { PlayerService } from './player/player.service';
import { BowlingState } from '../../bowling.state';
import { Game } from '../../models/game';
import { Player } from '../../models/player';
import { BowlingServiceAbstract } from '../bowling-service.abstract';

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
