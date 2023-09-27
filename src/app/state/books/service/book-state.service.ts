import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BooksState } from '../../app.state';
import * as actions from '../books.actions';
import * as selectors from '../books.selectors';
import { Book } from '../models/books.model';

@Injectable()
export class BookStateService {

  constructor(private readonly _store: Store<BooksState>) { }

  // Events
  fetchBooks$(): void {
    this._store.dispatch(actions.bookActions.getAll());
  }

  fetchCollections$(): void {
    this._store.dispatch(actions.collectionActions.getAll());
  }

  addBook$(bookId: string): void {
    this._store.dispatch(actions.collectionActions.addBook({ payload: bookId }));
  }

  removeBook$(bookId: string): void {
    this._store.dispatch(actions.collectionActions.removeBook({ payload: bookId }));
  }

  clearCollection$(): void {
    this._store.dispatch(actions.collectionActions.clearCollection());
  }

  // Selectors
  get books$(): Observable<ReadonlyArray<Book>> {
    return this._store.select(selectors.getBooks);
  };

  get message$(): Observable<string> {
    return this._store.select(selectors.getMessage);
  };

  get collection$(): Observable<ReadonlyArray<Book>> {
    return this._store.select(selectors.getCollection);
  }

}
