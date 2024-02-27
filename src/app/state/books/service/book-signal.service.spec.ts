import { BookService } from 'src/app/services/books/books.service';

import { TestBed, waitForAsync } from '@angular/core/testing';

import { of } from 'rxjs';
import { Author } from 'src/app/interfaces/models/books/author';
import { Book } from '../../../interfaces/models/books/book.';
import { bookSignals } from '../books.signals';
import { BookSignalService } from './book-signal.service';

describe('BookSignalService', () =>
{
   let service: BookSignalService;
   const bookService: jasmine.SpyObj<BookService> = jasmine.createSpyObj('BookService', ['dispatch', 'methods']);
   const book: Book = {
      id: '',
      volumeInfo: {
         title: '',
         authors: []
      }
   };

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         providers: [
            BookSignalService,
            { provide: BookService, useValue: bookService }
         ]
      });
      service = TestBed.inject(BookSignalService);
   });

   it('should be created', () =>
   {
      expect(service).toBeTruthy();
   });

   describe('methods', () =>
   {
      it('should fetch books', waitForAsync(() =>
      {
         const author: Author = { name: 'author' };
         spyOn(bookSignals().searching, 'set');
         spyOn(bookSignals(), 'author').and.returnValue(author.name);
         spyOn(bookSignals().books, 'set');
         bookService.dispatch.and.returnValue(of([book]));

         service.fetchBooks();

         expect(bookService.dispatch).toHaveBeenCalledWith(bookService.methods.getBooks, author);
         expect(bookSignals().books.set).toHaveBeenCalledOnceWith([book]);
         expect(bookSignals().searching.set).toHaveBeenCalledTimes(2);
         expect(bookSignals().searching.set).toHaveBeenCalledWith(false);
         expect(bookSignals().searching.set).toHaveBeenCalledWith(true);
      }));

      it('should add book', () =>
      {
         const myBook: Book = { ...book, id: '1' };
         spyOn(bookSignals().collection, 'set');
         spyOn(bookSignals(), 'books').and.returnValue([myBook]);

         service.addBook('1');

         expect(bookSignals().collection.set).toHaveBeenCalledOnceWith([myBook]);
      });

      it('should remove book', () =>
      {
         const myBook: Book = { ...book, id: '2' };
         spyOn(bookSignals().collection, 'set');
         spyOn(bookSignals(), 'collection').and.returnValue([myBook]);

         service.removeBook('2');

         expect(bookSignals().collection.set).toHaveBeenCalledOnceWith([]);
      });

      it('should clear collection', () =>
      {
         spyOn(bookSignals().collection, 'set');

         service.clearCollection();

         expect(bookSignals().collection.set).toHaveBeenCalledOnceWith([]);
      });

      it('should set author', () =>
      {
         spyOn(bookSignals().author, 'set');

         service.setAuthor('author');

         expect(bookSignals().author.set).toHaveBeenCalledOnceWith('author');
      });
   });
});
