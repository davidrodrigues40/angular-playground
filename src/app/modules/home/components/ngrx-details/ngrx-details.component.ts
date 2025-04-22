import { NgrxCanvasComponent } from 'src/app/canvas/ngrx-canvas/ngrx-canvas.component';
import { StateCanvasComponent } from 'src/app/canvas/state-canvas/state-canvas.component';
import { Title2Component } from 'src/app/components/title2/title2.component';
import { Title3Component } from 'src/app/components/title3/title3.component';
import { StateDialogComponent } from 'src/app/dialogs/state-dialog/state-dialog.component';
import { DialogOptions } from 'src/app/interfaces/models/dialog-options';

import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { BackButtonComponent } from '../back-button/back-button.component';

@Component({
   selector: 'app-ngrx-details',
   templateUrl: './ngrx-details.component.html',
   styleUrls: ['./ngrx-details.component.scss'],
   standalone: true,
   providers: [NotificationService],
   imports: [
      BackButtonComponent,
      Title2Component,
      MatDialogModule,
      NgrxCanvasComponent,
      StateCanvasComponent,
      Title3Component,
      MatIconModule,
      RouterModule
   ]
})
export class NgrxDetailsComponent {
   constructor(private readonly _dialog: MatDialog) { }

   openDialog(name: string): void {
      let options: DialogOptions = {
         cancelButton: {
            text: 'Cancel',
            action: 'cancel',
            reason: 'Cancel'
         }
      }

      if (name === 'state')
         this._dialog.open(StateDialogComponent, {
            data: { options: options },
            position: { top: '100px' }
         });
   }
}
