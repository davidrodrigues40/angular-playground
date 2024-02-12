import { DialogOptions } from 'src/app/interfaces/models/dialog-options';
import { MockComponent } from 'src/app/testing/testing.directive';

import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { StateDialogComponent } from './state-dialog.component';

describe('StateDialogComponent', () =>
{
   let component: StateDialogComponent;
   let fixture: ComponentFixture<StateDialogComponent>;
   let dialogRef: jasmine.SpyObj<MatDialogRef<StateDialogComponent>> = jasmine.createSpyObj('MatDialogRef', ['close']);
   const dialogOptions: DialogOptions = {
      okButton: {
         text: 'OK',
         action: 'ok',
         reason: 'OK'
      },
      cancelButton: {
         text: 'Cancel',
         action: 'cancel',
         reason: 'Cancel'
      }
   };
   const data = { options: dialogOptions };

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         imports: [
            StateDialogComponent,
         ],
         providers: [
            { provide: MAT_DIALOG_DATA, useValue: { options: {}, message: '' } },
            { provide: MatDialogRef, useValue: {} }
         ]
      })
         .overrideComponent(StateDialogComponent, {
            set: {
               imports: [
                  CommonModule,
                  MatButtonModule,
                  MatDialogModule,
                  MockComponent({ selector: 'app-base-dialog', template: '', standalone: true }),
                  MockComponent({ selector: 'app-ngrx-canvas', template: '', standalone: true }),
                  MockComponent({ selector: 'app-state-details', template: '', standalone: true }),
               ],
               providers: [
                  { provide: MAT_DIALOG_DATA, useValue: data },
                  { provide: MatDialogRef, useValue: dialogRef }
               ]
            }
         });
      fixture = TestBed.createComponent(StateDialogComponent);
      component = fixture.componentInstance;

      dialogRef.close.calls.reset();
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });

   describe('when onClick is called', () =>
   {
      it('should close the dialog with ok', () =>
      {
         component.onClick(dialogOptions.okButton);

         expect(dialogRef.close).toHaveBeenCalledWith(dialogOptions.okButton?.reason);
      });

      it('should close the dialog with cancel', () =>
      {
         component.onClick(dialogOptions.cancelButton);

         expect(dialogRef.close).toHaveBeenCalledWith(dialogOptions.cancelButton?.reason);
      });
   });
});
