import { Book } from 'src/app/interfaces/models/books/book.';
import { BookService } from 'src/app/services/books/books.service';
import { BookSignalService } from 'src/app/state/books/service/book-signal.service';
import { MockComponent } from 'src/app/testing/testing.directive';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksComponent } from './books.component';

describe('BooksComponent', () =>
{
   let component: BooksComponent;
   let fixture: ComponentFixture<BooksComponent>;
   let signalService: jasmine.SpyObj<BookSignalService> = jasmine.createSpyObj<BookSignalService>('signal-service', ['fetchBooks', 'addBook', 'removeBook', 'clearCollection']);
   let bookService: jasmine.SpyObj<BookService> = jasmine.createSpyObj('BookService', ['addBook', 'removeBook', 'clearCollection']);

   const books: Book[] = [];

   beforeAll(() =>
   {
      Object.defineProperties(signalService, {
         data: {
            value: {
               books: books,
               collection: books
            }
         }
      });
   });

   beforeEach(async () =>
   {
      await TestBed.configureTestingModule({
         declarations: [
            BooksComponent,
            MockComponent({ selector: 'app-book-list', standalone: false }),
            MockComponent({ selector: 'app-book-collection', standalone: false }),
         ],
         imports: [
            MockComponent({ selector: 'app-title' }),
            MockComponent({ selector: 'app-author' })
         ],
         providers: [
            { provide: BookSignalService, useValue: signalService },
            { provide: BookService, useValue: bookService },
         ]
      })
         .overrideComponent(BooksComponent, {
            set: {
               providers: [
                  { provide: BookSignalService, useValue: signalService },
                  { provide: BookService, useValue: bookService }
               ]
            }
         })
         .compileComponents();

      fixture = TestBed.createComponent(BooksComponent);
      component = fixture.componentInstance;

   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });

   describe('ngOnInit', () =>
   {

      it('should call the service events', () =>
      {
         component.ngOnInit();

         expect(signalService.fetchBooks).toHaveBeenCalled();
      });
   });

   describe('onAdd', () =>
   {
      it('should call the service events', () =>
      {
         component.onAdd("1");

         expect(signalService.addBook).toHaveBeenCalledOnceWith('1');
      });
   });

   describe('onRemove', () =>
   {
      it('should call the service events', () =>
      {
         component.onRemove("1");

         expect(signalService.removeBook).toHaveBeenCalledOnceWith('1');
      });
   });

   describe('onClear', () =>
   {
      it('should call the service events', () =>
      {
         component.onClear();

         expect(signalService.clearCollection).toHaveBeenCalled();
      });
   });
});
