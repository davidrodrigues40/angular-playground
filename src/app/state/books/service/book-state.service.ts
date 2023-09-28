import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IStateService } from 'src/app/interfaces/services/state-service.interface';
import { BooksState } from '../../app.state';
import { Event } from '../../common/event';
import * as actions from '../books.actions';
import * as selectors from '../books.selectors';
import { Book } from '../models/books.model';

@Injectable()
export class BookStateService implements IStateService {

  constructor(private readonly _store: Store<BooksState>) { }

  events = {
    _store: this._store,

    fetchBooks(): Event<string, Store<BooksState>> {
      return new Event(actions.bookActions.getAll(), this._store);
    },
    fetchCollections(): Event<string, Store<BooksState>> {
      return new Event(actions.collectionActions.getAll(), this._store);
    },
    addBook(bookId: string): Event<string, Store<BooksState>> {
      return new Event(actions.collectionActions.addBook({ payload: bookId }), this._store);
    },
    removeBook(bookId: string): Event<string, Store<BooksState>> {
      return new Event(actions.collectionActions.removeBook({ payload: bookId }), this._store);
    },
    clearCollection(): Event<string, Store<BooksState>> {
      return new Event(actions.collectionActions.clearCollection(), this._store);
    }

  };

  observables = {
    _store: this._store,

    get books$(): Observable<ReadonlyArray<Book>> {
      return this._store.select(selectors.getBooks);
    },
    get message$(): Observable<string> {
      return this._store.select(selectors.getMessage);
    },
    get collection$(): Observable<ReadonlyArray<Book>> {
      return this._store.select(selectors.getCollection);
    }
  }

}
