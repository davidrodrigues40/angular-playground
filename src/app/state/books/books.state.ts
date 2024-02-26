import { WritableSignal } from '@angular/core';

import { Book } from '../../interfaces/models/books/book.';

export interface BooksState
{
   books: WritableSignal<ReadonlyArray<Book>>;
   author: WritableSignal<string>;
   message: WritableSignal<any>;
   collection: WritableSignal<Array<Book>>;
   searching: WritableSignal<boolean>;
}