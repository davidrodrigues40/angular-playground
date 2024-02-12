import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialog } from 'src/app/dialogs/notification/notification.component';

describe('NotificationService', () =>
{
   let service: NotificationService;
   let dialogService: jasmine.SpyObj<MatDialog> = jasmine.createSpyObj('MatDialog', ['open']);
   let dialogRef: jasmine.SpyObj<any> = jasmine.createSpyObj('MatDialogRef', ['close']);

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         providers: [
            NotificationService,
            { provide: MatDialog, useValue: dialogService }
         ]
      });
      service = TestBed.inject(NotificationService);
   });

   it('should be created', () =>
   {
      expect(service).toBeTruthy();
   });

   describe('notify', () =>
   {
      it('should open a notification dialog', () =>
      {
         // Arrange
         const options = { title: 'title', buttons: [] };
         const message = 'message';
         dialogService.open.and.returnValue(dialogRef);

         // Act
         const result = service.notify(options, message);

         // Assert
         expect(result).toBeTruthy();
         expect(dialogService.open).toHaveBeenCalledWith(NotificationDialog, { data: { options, message } });
         expect(result).toEqual(dialogRef);
      });
   });
});
