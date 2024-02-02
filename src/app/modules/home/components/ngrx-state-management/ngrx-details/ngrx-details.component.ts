import { Title2Component } from 'src/app/components/title2/title2.component';
import { StateDialogComponent } from 'src/app/dialogs/state-dialog/state-dialog.component';
import { DialogOptions } from 'src/app/interfaces/models/dialog-options';

import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-ngrx-details',
    templateUrl: './ngrx-details.component.html',
    styleUrls: ['./ngrx-details.component.scss'],
    standalone: true,
    imports: [
        Title2Component,
        MatDialogModule
    ]
})
export class NgrxDetailsComponent
{
    constructor(private readonly _dialog: MatDialog) { }

    openDialog(name: string): void
    {
        let dialogRef;
        let options: DialogOptions = {
            cancelButton: {
                text: 'Cancel',
                action: 'cancel',
                reason: 'Cancel'
            }
        }
        switch (name)
        {
            case 'state':
                dialogRef = this._dialog.open(StateDialogComponent, {
                    data: { options: options },
                    position: { top: '100px' }
                });
                break;
            default:
                break;
        }
    }
}
