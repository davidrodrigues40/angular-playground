import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as fromActions from './books.actions';
import { BooksState } from '../app.state';

export const booksFeatureKey = 'books';
export const collectionFeatureKey = 'collection';
export const initialState: BooksState = { books: [], message: '' };

// reducers
const _booksReducer = createReducer(
  initialState,
  on(fromActions.GetAllBooksSuccess, (_state, { payload }) => ({ books: payload, message: 'Success' }))
);

export function booksReducer(state: any, action: Action) {
  return _booksReducer(state, action);
};

// selectors
export const getBooksState = createFeatureSelector<BooksState>('booksState');

export const getBooks = createSelector(
  getBooksState,
  (state: BooksState) => state.books
);
export const getMessage = createSelector(
  getBooksState,
  (state: BooksState) => state.message
);