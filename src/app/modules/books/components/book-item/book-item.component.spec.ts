import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookItemComponent } from './book-item.component';

describe('BootItemComponent', () =>
{
   let component: BookItemComponent;
   let fixture: ComponentFixture<BookItemComponent>;

   beforeEach(async () =>
   {
      await TestBed.configureTestingModule({
         declarations: [BookItemComponent]
      })
         .compileComponents();

      fixture = TestBed.createComponent(BookItemComponent);
      component = fixture.componentInstance;

   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });
});
