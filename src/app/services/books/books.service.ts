import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Book } from '../../state/books/models/books.model';
import { ApiService } from '../api.service';

@Injectable()
export class GoogleBooksService extends ApiService {
  private _books: Book[] = [];
  protected override base_url: string = 'https://www.googleapis.com/books/v1/volumes?maxResults=10&orderBy=relevance&q=oliver%20sacks';

  constructor(private http: HttpClient) { super(); }

  getBooks$(): Observable<Book[]> {
    return this.http
      .get<{ items: Book[] }>(this.base_url)
      .pipe(
        map((books) => {
          this._books = books.items || [];
          return this._books;
        }));
  }

  getCollection$(): Observable<Book[]> {
    return of([]);
  }

  addBook$(bookId: string): Observable<Book> {
    const found: Book | undefined = this._books.find(b => b.id === bookId);

    return of(found as Book);
  }

  removeBook$(bookId: string): Observable<Book> {
    return of(this._books.find(b => b.id === bookId) as Book);
  }

  clearCollection$(): Observable<void> {
    return of(void 0);
  }
}