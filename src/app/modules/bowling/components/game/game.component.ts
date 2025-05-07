import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BowlerRating } from '../../models/bowler-rating.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PlayerComponent } from '../player/player.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ScorecardComponent } from '../scorecard/scorecard.component';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { Player } from '../../models/player';

@Component({
   selector: 'app-game',
   templateUrl: './game.component.html',
   styleUrls: ['./game.component.scss'],
   standalone: true,
   imports: [
      CommonModule,
      PlayerComponent,
      MatIconModule,
      MatButtonModule,
      MatFormFieldModule,
      ScorecardComponent,
   ],
})
export class GameComponent {
   @Input() game?: Readonly<Game | null>;
   @Input() players: ReadonlyArray<Player> = [];
   @Input() ratings: ReadonlyArray<BowlerRating> = [];
   @Input() disablePlayGame: boolean = true;
   @Input() newGameDisabled: boolean = false;

   @Output() removePlayer = new EventEmitter<number>();
   @Output() playGame = new EventEmitter<void>();
   @Output() newGame = new EventEmitter<void>();
   @Output() changeAllPlayersRatings = new EventEmitter<void>();

   getRating(rating: number): string {
      const found = this.ratings.find(r => r.key === rating)?.value;

      return found ?? 'Beginner';
   }
}
