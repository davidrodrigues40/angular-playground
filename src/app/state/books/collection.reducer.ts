import { createFeature, createReducer, on } from '@ngrx/store';
import { BooksActions } from './books.actions';
import { collectionFeatureKey } from './books.reducer';

export const initialState: ReadonlyArray<string> = [];

export const collectionReducer = createReducer(
  initialState,
  on(BooksActions.removeBook, (state, { bookId }) =>
    state.filter((id) => id !== bookId)
  ),
  on(BooksActions.addBook, (state, { bookId }) => {
    if (state.indexOf(bookId) > -1) return state;

    return [...state, bookId];
  })
);
export const booksFeature = createFeature({
  name: collectionFeatureKey,
  reducer: collectionReducer
});