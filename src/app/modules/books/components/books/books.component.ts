import { Book } from 'src/app/interfaces/models/books/book.';
import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { BookService } from 'src/app/services/books/books.service';
import { BookSignalService } from 'src/app/state/books/service/book-signal.service';

import { Component } from '@angular/core';

@Component({
   selector: 'app-books',
   templateUrl: './books.component.html',
   styleUrls: ['./books.component.scss'],
   providers: [BookSignalService, BookService]
})
export class BooksComponent
{
   books: SignalObject<ReadonlyArray<Book>> = { value: [] };
   collection: SignalObject<ReadonlyArray<Book>> = { value: this._service.data.collection };

   constructor(private readonly _service: BookSignalService)
   {
      this._service.effects.bindBooks(this.books);
      this._service.effects.bindCollection(this.collection);
   }

   ngOnInit()
   {
      this._service.methods.fetchBooks();
   }

   onAdd(bookId: string): void
   {
      this._service.methods.addBook(bookId);
   }

   onRemove(bookId: string): void
   {
      this._service.methods.removeBook(bookId);
   }

   onClear(): void
   {
      this._service.methods.clearCollection();
   }
}
