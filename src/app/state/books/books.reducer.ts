import { createFeature, createReducer, on } from '@ngrx/store';
import * as BooksApiActions from './books.actions';
import { Book } from './books.model';

export const booksFeatureKey = 'books';
export const collectionFeatureKey = 'collection';
export const initialState: ReadonlyArray<Book> = [];
export const booksReducer = createReducer(
  initialState,
  on(BooksApiActions.BooksApiActions.retrievedBookList, (_state, { books }) => books)
);
export const booksFeature = createFeature({
  name: booksFeatureKey,
  reducer: booksReducer
});