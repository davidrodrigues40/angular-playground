import { NgrxCanvasComponent } from 'src/app/canvas/ngrx-canvas/ngrx-canvas.component';
import { StateCanvasComponent } from 'src/app/canvas/state-canvas/state-canvas.component';
import { DialogButton, DialogOptions } from 'src/app/interfaces/models/dialog-options';
import { StateDetailsComponent } from 'src/app/modules/home/components/state-details/state-details.component';

import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
   selector: 'app-state-dialog',
   standalone: true,
   imports: [
      StateDetailsComponent,
      StateCanvasComponent,
      CommonModule,
      MatButtonModule,
      NgrxCanvasComponent],
   templateUrl: './state-dialog.component.html',
   styleUrls: ['./state-dialog.component.scss']
})
export class StateDialogComponent implements OnInit
{
   constructor(@Inject(MAT_DIALOG_DATA) public data: { options: DialogOptions },
      private dialogRef: MatDialogRef<StateDialogComponent>) { }

   ngOnInit(): void
   {

   }

   onClick(button: DialogButton | undefined): void
   {
      if (button)
         this.dialogRef.close(button.reason);
   }
}
