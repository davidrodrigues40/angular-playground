import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/interfaces/models/books/book.';

@Component({
   selector: 'app-base-book-list',
   templateUrl: './base-book-list.component.html',
   styleUrls: ['./base-book-list.component.scss']
})
export class BaseBookListComponent
{
   @Input() books: ReadonlyArray<Book> = [];
   @Input() buttonColor: string = 'accent';
   @Input() icon: string = 'add';
   @Output() bookClick = new EventEmitter<string>();

   hoverBookId: string = '';

   onMouseEnter(bookId: string): void
   {
      this.hoverBookId = bookId;
   }

   onMouseOut(): void
   {
      this.hoverBookId = '';
   }
}
