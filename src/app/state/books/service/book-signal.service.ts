import { BookService } from 'src/app/services/books/books.service';
import { Injectable } from '@angular/core';
import { Author } from 'src/app/interfaces/models/books/author';
import { Book } from '../../../interfaces/models/books/book.';
import { bookSignals } from '../books.signals';

@Injectable()
export class BookSignalService {
   constructor(private readonly _service: BookService) { }

   fetchBooks(): void {
      bookSignals().searching.set(true);

      const author: Author = { name: bookSignals().author() };

      this._service.dispatch(this._service.methods.getBooks, author)
         .pipe()
         .subscribe((books: ReadonlyArray<Book>) => {
            bookSignals().books.set(books);
            bookSignals().searching.set(false);
         });
   };

   addBook(bookId: string): void {
      const collection: Array<Book> = bookSignals().collection();
      const book = bookSignals().books().find(b => b.id === bookId);

      if (book)
         bookSignals().collection.set([...collection, book]);
   };

   removeBook(bookId: string): void {
      bookSignals().collection.set(bookSignals().collection().filter(b => b.id !== bookId));
   };

   clearCollection(): void {
      bookSignals().collection.set([]);
   };

   setAuthor(author: string): void {
      bookSignals().author.set(author);
   };
}
