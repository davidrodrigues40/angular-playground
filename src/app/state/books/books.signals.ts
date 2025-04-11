import { signal } from '@angular/core';

import { Book } from '../../interfaces/models/books/book.';
import { BooksState } from './books.state';

export function bookSignals() {
   return _bookSignals;
}

const _bookSignals: BooksState =
{
   books: signal<ReadonlyArray<Book>>([] as ReadonlyArray<Book>),
   author: signal<string>(''),
   message: signal<string>(''),
   collection: signal<Array<Book>>([]),
   searching: signal<boolean>(true)
}
