import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksFooterComponent } from './books-footer.component';

describe('BooksFooterComponent', () =>
{
   let component: BooksFooterComponent;
   let fixture: ComponentFixture<BooksFooterComponent>;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         imports: [BooksFooterComponent]
      });
      fixture = TestBed.createComponent(BooksFooterComponent);
      component = fixture.componentInstance;

   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });
});
