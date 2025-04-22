import { NgrxCanvasComponent } from 'src/app/canvas/ngrx-canvas/ngrx-canvas.component';
import { DialogButton, DialogOptions } from 'src/app/interfaces/models/dialog-options';
import { StateDetailsComponent } from 'src/app/modules/home/components/state-details/state-details.component';

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';

@Component({
   selector: 'app-state-dialog',
   standalone: true,
   imports: [
      StateDetailsComponent,
      BaseDialogComponent,
      NgrxCanvasComponent],
   templateUrl: './state-dialog.component.html'
})
export class StateDialogComponent {
   constructor(@Inject(MAT_DIALOG_DATA) public data: { options: DialogOptions },
      public dialogRef: MatDialogRef<StateDialogComponent>) { }

   onClick(button: DialogButton | undefined): void {
      if (button)
         this.dialogRef.close(button.reason);
   }
}
