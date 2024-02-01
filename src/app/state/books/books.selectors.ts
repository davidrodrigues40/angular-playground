import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BooksState, CollectionState } from "./books.state";

const getBooksState = createFeatureSelector<BooksState>('booksState');

export const getBooks = createSelector(
    getBooksState,
    (state: BooksState) => state.books
);

export const getMessage = createSelector(
    getBooksState,
    (state: BooksState) => state.message
);

export const getCollectionState = createFeatureSelector<CollectionState>('collectionState');

export const getCollection = createSelector(
    getCollectionState,
    (state: CollectionState) => state.books
);