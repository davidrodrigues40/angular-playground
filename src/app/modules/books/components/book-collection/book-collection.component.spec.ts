import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookCollectionComponent } from './book-collection.component';
import { MockComponent } from 'src/app/testing/testing.directive';

describe('BookCollectionComponent', () =>
{
   let component: BookCollectionComponent;
   let fixture: ComponentFixture<BookCollectionComponent>;

   beforeEach(async () =>
   {
      await TestBed.configureTestingModule({
         declarations: [BookCollectionComponent],
         imports: [
            MockComponent({ selector: 'app-base-book-list', inputs: ['books', 'buttonColor', 'icon'] })
         ]
      })
         .compileComponents();

      fixture = TestBed.createComponent(BookCollectionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });
});
