import { Book } from 'src/app/interfaces/models/books/book.';
import { BookService } from 'src/app/services/books/books.service';

import { ChangeDetectionStrategy, Component, WritableSignal } from '@angular/core';
import { Title2Component } from 'src/app/components/title2/title2.component';
import { BooksState } from 'src/app/state/books.state';

@Component({
   selector: 'app-books',
   templateUrl: './books.component.html',
   styleUrls: ['./books.component.scss'],
   providers: [BookService, Title2Component],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksComponent {
   books: WritableSignal<ReadonlyArray<Book>> = BooksState.books;
   searching: WritableSignal<boolean> = BooksState.searching;
   collection: WritableSignal<ReadonlyArray<Book>> = BooksState.collection;
   author: WritableSignal<string> = BooksState.author;

   constructor(private readonly _bookService: BookService) { }

   ngOnInit() {
      BooksState.searching.set(false);
   }

   onAdd(bookId: string): void {
      this._bookService.addBook(bookId);
   }

   onRemove(bookId: string): void {
      this._bookService.removeBook(bookId);
   }

   onClear(): void {
      this._bookService.clearCollection();
   }

   search(): void {
      this._bookService.getBooksFromGoogle(BooksState.author());
   }
}
