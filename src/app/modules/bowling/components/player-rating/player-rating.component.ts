import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BowlerRating } from '../../models/bowler-rating.model';

@Component({
  selector: 'app-player-rating',
  templateUrl: './player-rating.component.html'
})
export class PlayerRatingComponent {
  @Input() ratings: ReadonlyArray<BowlerRating> = [];

  @Output() ratingChanged = new EventEmitter<number>();

  playerRating: number = 0;
}
