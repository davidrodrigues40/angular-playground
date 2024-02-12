import { NotificationDialog } from 'src/app/dialogs/notification/notification.component';

import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogOptions } from 'src/app/interfaces/models/dialog-options';

@Injectable()
export class NotificationService
{
   constructor(private readonly _dialogService: MatDialog) { }

   notify(options: DialogOptions, message: string): MatDialogRef<any>
   {
      return this._dialogService.open(NotificationDialog, {
         data: { options, message }
      });
   }
}
