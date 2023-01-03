import { createActionGroup, props } from '@ngrx/store';
import { BookEvent } from './book.events';
import { Book } from './books.model';

export const BooksActions = createActionGroup({
  source: 'Books',
  events: {
    [BookEvent.addBook]: props<{ bookId: string }>(),
    [BookEvent.removeBook]: props<{ bookId: string }>(),
  },
});

export const BooksApiActions = createActionGroup({
  source: 'Books API',
  events: {
    [BookEvent.retrievedBookList]: props<{ books: ReadonlyArray<Book> }>(),
    [BookEvent.getBooks]: props<null>()
  },
});