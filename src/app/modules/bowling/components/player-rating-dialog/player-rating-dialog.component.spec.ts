import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlayerRatingDialogComponent } from './player-rating-dialog.component';

describe('PlayerRatingDialogComponent', () => {
   let component: PlayerRatingDialogComponent;
   let fixture: ComponentFixture<PlayerRatingDialogComponent>;
   let dialogRef: jasmine.SpyObj<MatDialogRef<PlayerRatingDialogComponent>> = jasmine.createSpyObj('MatDialogRef', ['close']);
   let token: jasmine.SpyObj<typeof MAT_DIALOG_DATA> = jasmine.createSpyObj('MAT_DIALOG_DATA', ['data']);

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [
            { provide: MatDialogRef, useValue: dialogRef },
            { provide: MAT_DIALOG_DATA, useValue: token }
         ],
         imports: [PlayerRatingDialogComponent]
      });
      fixture = TestBed.createComponent(PlayerRatingDialogComponent);

      component = fixture.componentInstance;

   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   describe('when cancel invoked', () => {
      it('should close the dialog', () => {
         component.cancel();
         expect(dialogRef.close).toHaveBeenCalled();
      });
   });

   describe('when changeRating invoked', () => {
      it('should close the dialog', () => {
         component.changeRating(0);
         expect(dialogRef.close).toHaveBeenCalled();
      });
   });
});
