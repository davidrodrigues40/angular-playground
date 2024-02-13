import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BookListComponent } from "./book-list.component";
import { MockComponent } from "src/app/testing/testing.directive";

describe('BookListComponent', () =>
{
   let component: BookListComponent;
   let fixture: ComponentFixture<BookListComponent>;
   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         declarations: [BookListComponent],
         imports: [
            MockComponent({ selector: 'app-base-book-list', inputs: ['books', 'buttonColor', 'icon'] }),
         ]
      });

      fixture = TestBed.createComponent(BookListComponent);
      component = fixture.componentInstance;
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });
});