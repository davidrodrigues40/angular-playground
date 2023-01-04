import { Book } from './books/books.model';

export interface AppState {
  booksState: BooksState
}

export interface BooksState {
  books: ReadonlyArray<Book>;
  message: any;
}