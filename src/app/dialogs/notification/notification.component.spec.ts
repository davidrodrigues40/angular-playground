import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDialog } from './notification.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MockComponent } from 'src/app/testing/testing.directive';

describe('NotificationComponent', () =>
{
   let component: NotificationDialog;
   let fixture: ComponentFixture<NotificationDialog>;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         imports: [
            NotificationDialog,
            MockComponent({ selector: 'app-base-dialog', template: '', standalone: true })
         ],
         providers: [
            { provide: MAT_DIALOG_DATA, useValue: { options: {}, message: '' } },
            { provide: MatDialogRef, useValue: {} }
         ]
      });
      fixture = TestBed.createComponent(NotificationDialog);

      component = fixture.componentInstance;
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });


});
