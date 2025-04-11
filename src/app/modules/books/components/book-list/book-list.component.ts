import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/interfaces/models/books/book.';

@Component({
   selector: 'app-book-list',
   templateUrl: './book-list.component.html',
   styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
   @Input() books: ReadonlyArray<Book> = [];
   @Input() buttonColor: string = 'accent';
   @Input() icon: string = 'add';
   @Output() bookClick = new EventEmitter<string>();

   hoverBookId: string = '';

   onMouseEnter(bookId: string): void {
      this.hoverBookId = bookId;
   }

   onMouseOut(): void {
      this.hoverBookId = '';
   }
}
