import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseBookListComponent } from './base-book-list.component';
import { MockComponent } from 'src/app/testing/testing.directive';

describe('BaseBookListComponent', () =>
{
   let component: BaseBookListComponent;
   let fixture: ComponentFixture<BaseBookListComponent>;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         declarations: [BaseBookListComponent],
         imports: [
            MockComponent({ selector: 'app-empty-data', inputs: ['dataName'] }),
         ]
      });
      fixture = TestBed.createComponent(BaseBookListComponent);
      component = fixture.componentInstance;
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });

   describe('when onMouseEnter', () =>
   {
      it('should set hoverBookId', () =>
      {
         // Arrange
         const expected = 'test1';
         component.hoverBookId = '';

         // Act
         component.onMouseEnter(expected);

         // Assert
         expect(component.hoverBookId).toEqual(expected);
      });
   });

   describe('when onMouseOut', () =>
   {
      it('should set hoverBookId to empty string', () =>
      {
         // Act
         component.onMouseOut();

         // Assert
         expect(component.hoverBookId).toEqual('');
      });
   });
});
