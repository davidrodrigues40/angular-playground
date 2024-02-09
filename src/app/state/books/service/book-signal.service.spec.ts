import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { BookService } from 'src/app/services/books/books.service';
import { MockSignalComponent } from 'src/app/testing/testing.components';

import { TestBed } from '@angular/core/testing';

import { bookSignals } from '../books.signals';
import { Book } from '../models/books.model';
import { BookSignalService } from './book-signal.service';

describe('BookSignalService', () =>
{
   let service: BookSignalService;
   const bookService: jasmine.SpyObj<BookService> = jasmine.createSpyObj('BookService', ['dispatch', 'methods']);
   const bookSignal: SignalObject<ReadonlyArray<Book>> = { value: [] };
   const book: Book = {
      id: '',
      volumeInfo: {
         title: '',
         authors: []
      }
   }

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
         const fixture = TestBed.createComponent(MockSignalComponent);
         const component = fixture.componentInstance;
         const title: string = 'bind book';
         component.run(bookSignal, 'bindBooks', service);

         bookSignals().books.set([{ ...book, volumeInfo: { ...book.volumeInfo, title: title } }]);
         fixture.detectChanges();

         expect(bookSignal.value).toBeDefined();
         expect(bookSignal.value[0].volumeInfo.title).toEqual(title);
      });

      it('should bind collection', () =>
      {
         const fixture = TestBed.createComponent(MockSignalComponent);
         const component = fixture.componentInstance;
         const title: string = 'bind collection';
         component.run(bookSignal, 'bindCollection', service);

         bookSignals().collection.set([{ ...book, volumeInfo: { ...book.volumeInfo, title: title } }]);
         fixture.detectChanges();

         expect(bookSignal.value).toBeDefined();
         expect(bookSignal.value[0].volumeInfo.title).toEqual(title);
      });
   });

   describe('events', () =>
   {
      it('should fetch books', () =>
      {
         service.events.fetchBooks();
         expect(bookService.dispatch).toHaveBeenCalledWith(bookService.methods.getBooks);
      });

      it('should add book', () =>
      {
         bookSignals().collection.set([]);
         bookSignals().books.set([{ ...book, id: '1' }]);

         service.events.addBook('1');

         expect(bookSignals().collection().length).toEqual(1);
      });

      it('should remove book', () =>
      {
         bookSignals().collection.set([{ ...book, id: '2' }]);
         service.events.removeBook('2');

         expect(bookSignals().collection().length).toEqual(0);
      });

      it('should clear collection', () =>
      {
         bookSignals().collection.set([book]);

         service.events.clearCollection();

         expect(bookSignals().collection().length).toEqual(0);
      });
   });

   describe('observables', () =>
   {
      it('should get books', () =>
      {
         bookSignals().books.set([book]);
         expect(service.observables.books.length).toEqual(1);
      });

      it('should get message', () =>
      {
         bookSignals().message.set('message');
         expect(service.observables.message).toEqual('message');
      });

      it('should get collection', () =>
      {
         bookSignals().collection.set([book]);
         expect(service.observables.collection.length).toEqual(1);
      });
   });
});
