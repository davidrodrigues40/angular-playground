import { map } from 'rxjs';
import { HttpSignalService } from 'src/app/interfaces/abstracts/http-signal-service.abstract';
import { ISignalService } from 'src/app/interfaces/services/signal-service.interface';
import { bookSignals } from 'src/app/state/books/books.signals';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Book } from '../../interfaces/models/books/book.';

@Injectable()
export class BookService extends HttpSignalService implements ISignalService
{
   private _books: Book[] = [];
   private readonly base_url: string = 'https://www.googleapis.com/books/v1/volumes?maxResults=10&orderBy=relevance&q=oliver%20sacks';

   methods: {
      getBooks: string;
   } = {
         getBooks: 'getBooks',
      };

   override readonly details = {
      getBooks: this.getBooks,
      _books: this._books,
      httpClient: this.httpClient,
      base_url: this.base_url
   };

   constructor(private httpClient: HttpClient) { super(); }

   private getBooks(): void
   {
      this.httpClient
         .get<{ items: Book[] }>(this.base_url)
         .pipe(
            map((books) =>
            {
               this._books = books.items || [];
               return this._books;
            }))
         .subscribe(books => bookSignals().books.set(books));
   }
}