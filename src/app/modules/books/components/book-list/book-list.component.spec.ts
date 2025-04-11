import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';
import { MockComponent } from 'src/app/testing/testing.directive';

describe('BaseBookListComponent', () => {
   let component: BookListComponent;
   let fixture: ComponentFixture<BookListComponent>;

   beforeEach(() => {
      TestBed.configureTestingModule({
         declarations: [BookListComponent],
         imports: [
            MockComponent({ selector: 'app-empty-data', inputs: ['dataName'] }),
         ]
      });
      fixture = TestBed.createComponent(BookListComponent);
      component = fixture.componentInstance;
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   describe('when onMouseEnter', () => {
      it('should set hoverBookId', () => {
         // Arrange
         const expected = 'test1';
         component.hoverBookId = '';

         // Act
         component.onMouseEnter(expected);

         // Assert
         expect(component.hoverBookId).toEqual(expected);
      });
   });

   describe('when onMouseOut', () => {
      it('should set hoverBookId to empty string', () => {
         // Act
         component.onMouseOut();

         // Assert
         expect(component.hoverBookId).toEqual('');
      });
   });
});
