import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BooksActions, BooksApiActions } from 'src/app/state/books/books.actions';
import { Book } from '../../state/books/books.model';

@Injectable({ providedIn: 'root' })
export class GoogleBooksService {
  constructor(private http: HttpClient, private store: Store) { }

  getBooks(): void {
    this.getBooks$()
      .subscribe(books => {
        this.store.dispatch(BooksApiActions.retrievedBookList({ books }))
      });
  }

  getBooks$(): Observable<Book[]> {
    return this.http
      .get<{ items: Book[] }>(
        'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=oliver%20sacks'
      )
      .pipe(map((books) => books.items || []));
  }

  addBook(bookId: string): void {
    this.store.dispatch(BooksActions.addBook({ bookId }));
  }

  removeBook(bookId: string): void {
    this.store.dispatch(BooksActions.removeBook({ bookId }));
  }
}