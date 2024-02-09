import { Book } from 'src/app/interfaces/models/books/book.';

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
   selector: 'app-book-list',
   templateUrl: './book-list.component.html',
   styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent
{
   @Input() books: ReadonlyArray<Book> = [];
   @Output() add = new EventEmitter<string>();
}