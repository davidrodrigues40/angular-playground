import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BowlerRating } from '../../models/bowler-rating.model';

@Component({
   selector: 'app-player-rating-dialog',
   templateUrl: './player-rating-dialog.component.html'
})
export class PlayerRatingDialogComponent {
   constructor(private _dialogRef: MatDialogRef<PlayerRatingDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { ratings: ReadonlyArray<BowlerRating> }) { }

   cancel(): void {
      this._dialogRef.close();
   }

   changeRating(rating: number): void {
      this._dialogRef.close(rating);
   }
}
