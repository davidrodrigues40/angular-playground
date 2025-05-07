import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { DialogOptions } from 'src/app/interfaces/models/dialog-options';

@Component({
   selector: 'app-notification',
   templateUrl: './notification.component.html',
   standalone: true,
   imports: [
      BaseDialogComponent
   ]
})
export class NotificationDialog {
   constructor(@Inject(MAT_DIALOG_DATA) public data: { options: DialogOptions, message: string },
      public dialogRef: MatDialogRef<NotificationDialog>) {
   }
}
