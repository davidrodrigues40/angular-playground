import { Book } from 'src/app/interfaces/models/books/book.';
import { BookService } from 'src/app/services/books/books.service';
import { BookSignalService } from 'src/app/state/books/service/book-signal.service';

import { ChangeDetectionStrategy, Component, WritableSignal } from '@angular/core';
import { bookSignals } from 'src/app/state/books/books.signals';

@Component({
   selector: 'app-books',
   templateUrl: './books.component.html',
   styleUrls: ['./books.component.scss'],
   providers: [BookSignalService, BookService],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksComponent
{
   books: WritableSignal<ReadonlyArray<Book>> = bookSignals().books;
   searching: WritableSignal<boolean> = bookSignals().searching;
   collection: WritableSignal<ReadonlyArray<Book>> = bookSignals().collection;

   constructor(private readonly _service: BookSignalService) { }

   ngOnInit()
   {
      this.search();
   }

   onAdd(bookId: string): void
   {
      this._service.addBook(bookId);
   }

   onRemove(bookId: string): void
   {
      this._service.removeBook(bookId);
   }

   onClear(): void
   {
      this._service.clearCollection();
   }

   search(): void
   {
      this._service.fetchBooks();
   }
}
