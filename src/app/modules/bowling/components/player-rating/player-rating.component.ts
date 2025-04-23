import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BowlerRating } from '../../models/bowler-rating.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-player-rating',
  templateUrl: './player-rating.component.html',
  standalone: true,
  imports: [
    // Material
    MatFormFieldModule,
    MatSelectModule,
  ],
})
export class PlayerRatingComponent {
  @Input() ratings: ReadonlyArray<BowlerRating> = [];

  @Output() ratingChanged = new EventEmitter<number>();

  playerRating: number = -1;
}
