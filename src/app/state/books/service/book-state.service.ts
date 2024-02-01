import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IStateService } from 'src/app/interfaces/services/state-service.interface';
import { BooksState } from '../books.state';
import { StateEvent } from '../../common/state-event';
import * as actions from '../books.actions';
import * as selectors from '../books.selectors';
import { Book } from '../models/books.model';

@Injectable()
export class BookStateService implements IStateService
{

    constructor(private readonly _store: Store<BooksState>) { }

    events = {
        _store: this._store,

        fetchBooks(): StateEvent<string, Store<BooksState>>
        {
            return new StateEvent(actions.bookActions.getAll(), this._store);
        },
        fetchCollections(): StateEvent<string, Store<BooksState>>
        {
            return new StateEvent(actions.collectionActions.getAll(), this._store);
        },
        addBook(bookId: string): StateEvent<string, Store<BooksState>>
        {
            return new StateEvent(actions.collectionActions.addBook({ payload: bookId }), this._store);
        },
        removeBook(bookId: string): StateEvent<string, Store<BooksState>>
        {
            return new StateEvent(actions.collectionActions.removeBook({ payload: bookId }), this._store);
        },
        clearCollection(): StateEvent<string, Store<BooksState>>
        {
            return new StateEvent(actions.collectionActions.clearCollection(), this._store);
        }

    };

    observables = {
        _store: this._store,

        get books$(): Observable<ReadonlyArray<Book>>
        {
            return this._store.select(selectors.getBooks);
        },
        get message$(): Observable<string>
        {
            return this._store.select(selectors.getMessage);
        },
        get collection$(): Observable<ReadonlyArray<Book>>
        {
            return this._store.select(selectors.getCollection);
        }
    }

}
