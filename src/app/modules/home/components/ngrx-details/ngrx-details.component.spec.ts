import { StateDialogComponent } from 'src/app/dialogs/state-dialog/state-dialog.component';
import { MockComponent } from 'src/app/testing/testing.directive';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { NgrxDetailsComponent } from './ngrx-details.component';

describe('NgrxDetailsComponent', () =>
{
   let component: NgrxDetailsComponent;
   let fixture: ComponentFixture<NgrxDetailsComponent>;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         imports: [NgrxDetailsComponent]
      })
         .overrideComponent(NgrxDetailsComponent, {
            set: {
               imports: [
                  MatDialogModule,
                  MockComponent({ selector: 'app-ngrx-canvas', template: '', standalone: true, }),
                  MockComponent({ selector: 'app-state-canvas', template: '', standalone: true, }),
                  MockComponent({ selector: 'app-title2', template: '', standalone: true }),
                  MockComponent({ selector: 'app-title3', template: '', standalone: true }),
               ]
            }
         });
      fixture = TestBed.createComponent(NgrxDetailsComponent);
      component = fixture.componentInstance;
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });

   describe('openDialog', () =>
   {
      it('should open state dialog', () =>
      {
         const name: string = 'state';
         const dialogSpy = spyOn(component['_dialog'], 'open');

         component.openDialog(name);

         expect(dialogSpy).toHaveBeenCalledOnceWith(StateDialogComponent, {
            data: { options: { cancelButton: { text: 'Cancel', action: 'cancel', reason: 'Cancel' } } },
            position: { top: '100px' }
         });
      });

      it('should not open dialog', () =>
      {
         const name: string = 'other';
         const dialogSpy = spyOn(component['_dialog'], 'open');

         component.openDialog(name);

         expect(dialogSpy).not.toHaveBeenCalled();
      })
   });
});
