import { TitleComponent } from 'src/app/components/title/title.component';
import { DialogButton, DialogOptions } from 'src/app/interfaces/models/dialog-options';

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
   selector: 'app-base-dialog',
   templateUrl: './base-dialog.component.html',
   styleUrls: ['./base-dialog.component.scss'],
   standalone: true,
   imports: [
      CommonModule,
      TitleComponent,
      CommonModule,
      MatButtonModule,]
})
export class BaseDialogComponent implements OnInit
{
   @Input() dialogOptions!: DialogOptions;
   @Input() dialogRef!: MatDialogRef<any>;
   @Output() onClose: EventEmitter<string> = new EventEmitter<string>();

   ngOnInit(): void
   {
      if (this.dialogOptions === undefined)
         throw new Error('Dialog options are required');
   }

   onClick(button: DialogButton | undefined): void
   {
      if (button)
      {
         this.dialogRef.close(button.reason);
         this.onClose.emit(button.reason);
      }
   }
}
