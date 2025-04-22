import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Book } from '../../interfaces/models/books/book.';
import { BooksState } from 'src/app/state/books.state';

@Injectable()
export class BookService {
   private readonly _take: number = 20;
   private readonly base_url: string = `https://www.googleapis.com/books/v1/volumes?maxResults=${this._take}&orderBy=relevance`;

   constructor(private readonly httpClient: HttpClient) { }

   getBooksFromGoogle(author: string): void {
      if (!author) {
         BooksState.books.set([]);
         BooksState.searching.set(false);
         return;
      }

      const url = `${this.base_url}&q=${author}`;

      this.httpClient
         .get<{ items: Book[] }>(url)
         .subscribe(response => {
            BooksState.books.set(response.items);
            BooksState.searching.set(false);
         });
   }

   addBook(bookId: string): void {
      const collection: Array<Book> = BooksState.collection();
      const book = BooksState.books().find(b => b.id === bookId);

      if (book)
         BooksState.collection.set([...collection, book]);
   };

   removeBook(bookId: string): void {
      BooksState.collection.set(BooksState.collection().filter(b => b.id !== bookId));
   };

   clearCollection(): void {
      BooksState.collection.set([]);
   };

   setAuthor(author: string): void {
      BooksState.author.set(author);
   };
}