import { Observable, map } from 'rxjs';
import { HttpSignalService } from 'src/app/interfaces/abstracts/http-signal-service.abstract';
import { ISignalService } from 'src/app/interfaces/services/signal-service.interface';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Author } from 'src/app/interfaces/models/books/author';
import { Book } from '../../interfaces/models/books/book.';

@Injectable()
export class BookService extends HttpSignalService implements ISignalService
{
   private _books: Book[] = [];
   private _take: number = 20;
   private readonly base_url: string = `https://www.googleapis.com/books/v1/volumes?maxResults=${this._take}&orderBy=relevance`;

   methods: {
      getBooks: string;
   } = {
         getBooks: 'getBooks',
      };

   readonly details = {
      getBooks: this.getBooks,
      _books: this._books,
      httpClient: this.httpClient,
      base_url: this.base_url
   };

   constructor(private httpClient: HttpClient) { super(); }

   private getBooks(author: Author): Observable<Book[]>
   {
      const url = `${this.base_url}&q=${author.name}`;

      return this.httpClient
         .get<{ items: Book[] }>(url)
         .pipe(
            map((books) =>
            {
               this._books = books.items || [];
               return this._books;
            }));
   }
}