import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, map } from 'rxjs';
import { Book } from '../../state/books/books.model';

@Injectable({ providedIn: 'root' })
export class GoogleBooksService {
  private _books: Book[] = [];

  constructor(private http: HttpClient, private store: Store) { }

  getBooks(): void {
    this.getBooks$();
  }

  getBooks$(): Observable<Book[]> {
    return this.http
      .get<{ items: Book[] }>(
        'https://www.googleapis.com/books/v1/volumes?maxResults=10&orderBy=relevance&q=oliver%20sacks')
      .pipe(
        map((books) => {
          this._books = books.items || [];
          return this._books || []
        }));
  }

  getCollection$(): Observable<Book[]> {
    return this.collectionGetApi$();
  }

  addBook$(bookId: string): Observable<Book> {
    return this.addBookApi$(bookId);
  }

  removeBook$(bookId: string): Observable<Book> {
    return this.removeBookApi$(bookId);
  }

  clearCollection$(): Observable<void> {
    return of(null);
  }

  collectionGetApi$(): Observable<Book[]> {
    return of([]);
  }

  addBookApi$(bookId: string): Observable<Book> {
    const found: Book = this._books.find(b => b.id === bookId);

    return of(found);
  }

  removeBookApi$(bookId: string): Observable<Book> {
    return of(this._books.find(b => b.id === bookId));
  }
}