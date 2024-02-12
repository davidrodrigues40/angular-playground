import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDialogComponent } from './base-dialog.component';
import { DialogButton } from 'src/app/interfaces/models/dialog-options';
import { MatDialogRef } from '@angular/material/dialog';

describe('BaseDialogComponent', () =>
{
   let component: BaseDialogComponent;
   let fixture: ComponentFixture<BaseDialogComponent>;
   const dialogRef: jasmine.SpyObj<MatDialogRef<any>> = jasmine.createSpyObj('MatDialogRef', ['close']);

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         imports: [BaseDialogComponent]
      });
      fixture = TestBed.createComponent(BaseDialogComponent);
      component = fixture.componentInstance;

      component.dialogRef = dialogRef;
      dialogRef.close.calls.reset();
      spyOn(component.onClose, 'emit');
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });

   describe('ngOnInit', () =>
   {
      it('should throw an error if dialogOptions is undefined', () =>
      {
         Object.defineProperty(component, 'dialogOptions', { value: undefined });

         expect(() => component.ngOnInit()).toThrowError('Dialog options are required');
      });
   });

   describe('onClick', () =>
   {
      it('should close the dialog and emit the reason', () =>
      {
         // Arrange
         const button: DialogButton = {
            reason: 'reason',
            text: '',
            action: 'ok'
         };
         component.dialogRef = dialogRef;

         // Act
         component.onClick(button);

         // Assert
         expect(component.dialogRef.close).toHaveBeenCalledWith(button.reason);
         expect(component.onClose.emit).toHaveBeenCalledWith(button.reason);
      });

      it('should not close the dialog if the button is undefined', () =>
      {
         // Arrange
         component.dialogRef = dialogRef;

         // Act
         component.onClick(undefined);

         // Assert
         expect(dialogRef.close).not.toHaveBeenCalled();
         expect(component.onClose.emit).not.toHaveBeenCalled();
      });
   });
});
