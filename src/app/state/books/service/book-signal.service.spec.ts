import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { BookService } from 'src/app/services/books/books.service';

import { TestBed, waitForAsync } from '@angular/core/testing';

import { of } from 'rxjs';
import { configureEventTestingModule, eventTest } from 'src/app/testing/testing.functions';
import { Book } from '../../../interfaces/models/books/book.';
import { bookSignals } from '../books.signals';
import { BookSignalService } from './book-signal.service';

describe('BookSignalService', () =>
{
   let service: BookSignalService;
   const bookService: jasmine.SpyObj<BookService> = jasmine.createSpyObj('BookService', ['dispatch', 'methods']);
   const bookSignal: SignalObject<ReadonlyArray<Book>> = { value: [] };
   const collectionSignal: SignalObject<ReadonlyArray<Book>> = { value: [] };
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

   describe('effects', () =>
   {
      it('should bind books', () =>
      {
         // Arrange
         const title: string = 'bind book';
         const myBook: Book = { ...book, volumeInfo: { ...book.volumeInfo, title: title } };
         configureEventTestingModule(bookSignal, 'bindBooks', service);

         // Act
         eventTest([myBook], bookSignals().books);

         // Assert
         expect(bookSignal.value).toBeDefined();
         expect(bookSignal.value.length).toEqual(1);
         expect(bookSignal.value[0].volumeInfo.title).toEqual(title);
      });

      it('should bind collection', () =>
      {
         // Arrange
         const title: string = 'bind collection';
         const myBook: Book = { ...book, volumeInfo: { ...book.volumeInfo, title: title } };
         configureEventTestingModule(collectionSignal, 'bindCollection', service);

         // Act
         eventTest([myBook], bookSignals().collection);

         // Assert
         expect(collectionSignal.value).toBeDefined();
         expect(collectionSignal.value.length).toEqual(1);
         expect(collectionSignal.value[0].volumeInfo.title).toEqual(title);
      });
   });

   describe('events', () =>
   {
      it('should fetch books', waitForAsync(() =>
      {
         bookSignals().books.set([]);
         bookService.dispatch.and.returnValue(of([book]));

         service.methods.fetchBooks();

         expect(bookService.dispatch).toHaveBeenCalledWith(bookService.methods.getBooks);
         expect(bookSignals().books()).toEqual([book]);
      }));

      it('should add book', () =>
      {
         bookSignals().collection.set([]);
         bookSignals().books.set([{ ...book, id: '1' }]);

         service.methods.addBook('1');

         expect(bookSignals().collection().length).toEqual(1);
      });

      it('should remove book', () =>
      {
         bookSignals().collection.set([{ ...book, id: '2' }]);
         service.methods.removeBook('2');

         expect(bookSignals().collection().length).toEqual(0);
      });

      it('should clear collection', () =>
      {
         bookSignals().collection.set([book]);

         service.methods.clearCollection();

         expect(bookSignals().collection().length).toEqual(0);
      });
   });

   describe('observables', () =>
   {
      it('should get books', () =>
      {
         bookSignals().books.set([book]);
         expect(service.data.books.length).toEqual(1);
      });

      it('should get message', () =>
      {
         bookSignals().message.set('message');
         expect(service.data.message).toEqual('message');
      });

      it('should get collection', () =>
      {
         bookSignals().collection.set([book]);
         expect(service.data.collection.length).toEqual(1);
      });
   });
});
