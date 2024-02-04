import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { IHttpSignalStateService } from 'src/app/interfaces/services/signal-state-service.interface';
import { BookService } from 'src/app/services/books/books.service';

import { effect, Injectable } from '@angular/core';

import { bookSignals } from '../books.signals';
import { Book } from '../models/books.model';

@Injectable()
export class BookSignalService implements IHttpSignalStateService
{
   constructor(private readonly _service: BookService) { }
   effects = {
      _service: this._service,
      bindBooks(obj: SignalObject<ReadonlyArray<Book>>): void
      {
         effect(() =>
         {
            obj.value = bookSignals().books();
         });
      },
      bindCollection(obj: SignalObject<ReadonlyArray<Book>>): void
      {
         effect(() =>
         {
            obj.value = bookSignals().collection();
         });
      }
   };
   events = {
      _service: this._service,
      fetchBooks(): void
      {
         this._service.dispatch(this._service.methods.getBooks);
      },
      addBook(bookId: string): void
      {
         const collection: Array<Book> = bookSignals().collection();
         const book = bookSignals().books().find(b => b.id === bookId);

         if (book)
            bookSignals().collection.set([...collection, book]);
      },
      removeBook(bookId: string): void
      {
         bookSignals().collection.set(bookSignals().collection().filter(b => b.id !== bookId));
      },
      clearCollection(): void
      {
         bookSignals().collection.set([]);
      }
   };
   observables = {
      get books(): ReadonlyArray<Book>
      {
         return bookSignals().books();
      },
      get message(): string
      {
         return bookSignals().message();
      },
      get collection(): ReadonlyArray<Book>
      {
         return bookSignals().collection();
      }
   };
}
