import { signal } from '@angular/core';

import { BooksState } from './books.state';
import { Book } from './models/books.model';

export function bookSignals()
{
   return _bookSignals;
}

const _bookSignals: BooksState =
{
   books: signal<ReadonlyArray<Book>>([] as ReadonlyArray<Book>),
   message: signal<string>(''),
   collection: signal<Array<Book>>([])
}
