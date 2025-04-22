import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BowlerRating } from '../../models/bowler-rating.model';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
})
export class AddPlayerComponent {
  @Input() ratings: ReadonlyArray<BowlerRating> = [];

  @Output() addPlayer = new EventEmitter<{ name: string, rating: number }>();
  @Output() newGame = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();

  playerRating: number = 0;
  playerName: string = '';

  keypressed(event: KeyboardEvent) {
    if (event.key === 'Enter')
      if (this.playerName.length > 0 && this.playerName !== 'clear')
        this.add();
      else if (this.playerName === 'clear') {
        this.playerName = '';
        this.playerRating = 0;
        this.clear.emit();
      }
      else if (!this.playerName)
        this.newGame.emit();
  }

  add(): void {
    if (this.playerName.length > 0) {
      this.addPlayer.emit({ name: this.playerName, rating: this.playerRating });
      this.playerName = '';
    }
  }

  ratingChanged(rating: number): void {
    this.playerRating = rating;
  }
}
