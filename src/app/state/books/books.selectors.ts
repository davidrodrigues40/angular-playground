import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Book } from './books.model';
import { booksFeature } from './books.reducer';

export const selectBooks = createFeatureSelector<ReadonlyArray<Book>>('books');

export const selectCollectionState = createFeatureSelector<ReadonlyArray<string>>('collection');

export const selectBookCollection = createSelector(
  booksFeature.selectBooksState,
  selectCollectionState,
  (books, collection) => {
    return collection.map((id) => books.find((book) => book.id === id));
  }
);