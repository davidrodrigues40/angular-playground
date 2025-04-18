import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookItemComponent } from './book-item.component';
import { Title4Component } from 'src/app/components/title4/title4.component';

describe('BootItemComponent', () => {
   let component: BookItemComponent;
   let fixture: ComponentFixture<BookItemComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [BookItemComponent],
         imports: [Title4Component]
      })
         .compileComponents();

      fixture = TestBed.createComponent(BookItemComponent);
      component = fixture.componentInstance;

   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
