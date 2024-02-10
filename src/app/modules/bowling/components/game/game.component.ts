import { Game } from 'src/app/interfaces/models/bowling/game';
import { Player } from 'src/app/interfaces/models/bowling/player';

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BowlerRating } from '../../models/bowler-rating.model';

@Component({
   selector: 'app-game',
   templateUrl: './game.component.html',
   styleUrls: ['./game.component.scss']
})
export class GameComponent
{
   @Input() game?: Readonly<Game | null>;
   @Input() players: ReadonlyArray<Player> = [];
   @Input() ratings: ReadonlyArray<BowlerRating> = [];
   @Input() disablePlayGame: boolean = true;
   @Input() newGameDisabled: boolean = false;

   @Output() removePlayer = new EventEmitter<number>();
   @Output() playGame = new EventEmitter<void>();
   @Output() newGame = new EventEmitter<void>();
   @Output() changeAllPlayersRatings = new EventEmitter<void>();

   getRating(rating: number): string
   {
      const found = this.ratings.find(r => r.key === rating)?.value;

      return found ?? 'Beginner';
   }
}
