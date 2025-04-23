import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BowlerRating } from '../../models/bowler-rating.model';
import { PlayerRatingComponent } from '../player-rating/player-rating.component';

@Component({
   selector: 'app-player-rating-dialog',
   templateUrl: './player-rating-dialog.component.html',
   standalone: true,
   imports: [PlayerRatingComponent]
})
export class PlayerRatingDialogComponent {
   constructor(private readonly _dialogRef: MatDialogRef<PlayerRatingDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { ratings: ReadonlyArray<BowlerRating> }) { }

   cancel(): void {
      this._dialogRef.close();
   }

   changeRating(rating: number): void {
      this._dialogRef.close(rating);
   }
}
