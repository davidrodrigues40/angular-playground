import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from './books.actions';
import { BooksState, CollectionState } from '../app.state';

export const booksState: BooksState = { books: [], message: '' };
export const collectionState: CollectionState = { books: [], message: '' };

// reducers - used for result methods
const _booksReducer = createReducer(
  booksState,
  on(fromActions.bookActions.getAllSuccess, (_state, { payload }) => ({ books: payload, message: 'Success' }))
);

const _collectionReducer = createReducer(
  collectionState,
  on(fromActions.collectionActions.getAllSuccess, (_state, { payload }) => ({ books: payload, message: 'Success' })),
  on(fromActions.collectionActions.addBookSuccess, (_state, { payload }) => {
    if (_state.books.indexOf(payload) > -1) return { books: _state.books, message: 'Success' };

    return { books: [..._state.books, payload], message: 'Success' };
  }),
  on(fromActions.collectionActions.removeBookSuccess, (_state, { payload }) => {
    console.log('payload', payload);
    return { books: _state.books.filter(book => book.id !== payload.id), message: 'Success' };
  }),
  on(fromActions.collectionActions.clearCollectionSuccess, (_state) => {
    return { books: [], message: 'Success' };
  })
)

export function booksReducer(state: any, action: Action) {
  return _booksReducer(state, action);
};

export function collectionReducer(state: any, action: Action) {
  return _collectionReducer(state, action);
}