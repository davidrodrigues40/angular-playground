import { Book } from './books/books.model';

export interface AppState {
  booksState: BooksState;
  collectionState: CollectionState;
}

export interface BooksState {
  books: ReadonlyArray<Book>;
  message: any;
}

export interface CollectionState {
  books: ReadonlyArray<Book>;
  message: any;
}