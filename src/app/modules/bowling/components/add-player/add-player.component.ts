import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BowlerRating } from '../../models/bowler-rating.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PlayerRatingComponent } from '../player-rating/player-rating.component';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
  standalone: true,
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    // Material
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatChipsModule,
    PlayerRatingComponent,
  ]

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
