import { signal, WritableSignal } from '@angular/core';
import { Book } from '../interfaces/models/books/book.';

export class BooksState {
   static readonly books: WritableSignal<ReadonlyArray<Book>> = signal<ReadonlyArray<Book>>([] as ReadonlyArray<Book>);
   static readonly author: WritableSignal<string> = signal<string>('');
   static readonly message: WritableSignal<any> = signal<string>('');
   static readonly collection: WritableSignal<Array<Book>> = signal<Array<Book>>([]);
   static readonly searching: WritableSignal<boolean> = signal<boolean>(true);
};
