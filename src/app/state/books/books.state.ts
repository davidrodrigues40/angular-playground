import { WritableSignal } from '@angular/core';

import { Book } from './models/books.model';

export interface BooksState
{
   books: WritableSignal<ReadonlyArray<Book>>;
   message: WritableSignal<any>;
   collection: WritableSignal<Array<Book>>;
}