import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/modules/books/models/book.';
import { BookItemComponent } from '../book-item/book-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmptyDataComponent } from 'src/app/components/empty-data/empty-data.component';

@Component({
   selector: 'app-book-list',
   templateUrl: './book-list.component.html',
   styleUrls: ['./book-list.component.scss'],
   imports: [
      CommonModule,
      BookItemComponent,
      MatButtonModule,
      MatIconModule,
      EmptyDataComponent,
   ],
   standalone: true,
})
export class BookListComponent {
   @Input() books: ReadonlyArray<Book> = [];
   @Input() buttonColor: string = 'primary';
   @Input() icon: string = 'add';
   @Output() bookClick = new EventEmitter<string>();

   hoverBookId: string = '';

   onMouseEnter(bookId: string): void {
      this.hoverBookId = bookId;
   }

   onMouseOut(): void {
      this.hoverBookId = '';
   }

   bookSelected(id: string): void {
      this.bookClick.emit(id);
      this.hoverBookId = '';
   }
}
