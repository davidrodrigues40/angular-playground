import { Book } from 'src/app/modules/books/models/book.';
import { BookService } from 'src/app/modules/books/services/books.service';
import { MockComponent } from 'src/app/testing/testing.directive';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksComponent } from './books.component';
import { Title2Component } from 'src/app/components/title2/title2.component';
import { BooksState } from './books.state';

describe('BooksComponent', () => {
   let component: BooksComponent;
   let fixture: ComponentFixture<BooksComponent>;
   let bookService: jasmine.SpyObj<BookService> = jasmine.createSpyObj<BookService>('signal-service', ['getBooksFromGoogle', 'addBook', 'removeBook', 'clearCollection']);

   const books: Book[] = [];

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [
            BooksComponent,
            MockComponent({ selector: 'app-book-list', standalone: false }),
            MockComponent({ selector: 'app-book-collection', standalone: false }),
         ],
         imports: [
            Title2Component,
            MockComponent({ selector: 'app-title' }),
            MockComponent({ selector: 'app-author' })
         ],
         providers: [
            { provide: BookService, useValue: bookService },
         ]
      })
         .overrideComponent(BooksComponent, {
            set: {
               providers: [
                  { provide: BookService, useValue: bookService }
               ]
            }
         })
         .compileComponents();

      fixture = TestBed.createComponent(BooksComponent);
      component = fixture.componentInstance;

   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   describe('ngOnInit', () => {

      it('should set searching to false', () => {
         component.ngOnInit();

         expect(BooksState.searching()).toBeFalsy();
      });
   });

   describe('onAdd', () => {
      it('should call the service events', () => {
         component.onAdd("1");

         expect(bookService.addBook).toHaveBeenCalledOnceWith('1');
      });
   });

   describe('onRemove', () => {
      it('should call the service events', () => {
         component.onRemove("1");

         expect(bookService.removeBook).toHaveBeenCalledOnceWith('1');
      });
   });

   describe('onClear', () => {
      it('should call the service events', () => {
         component.onClear();

         expect(bookService.clearCollection).toHaveBeenCalled();
      });
   });

   describe('search', () => {
      it('should call the service events', () => {
         const author = 'test author';
         BooksState.author.set(author);

         component.search();

         expect(bookService.getBooksFromGoogle).toHaveBeenCalledOnceWith(author);
      });
   });
});
