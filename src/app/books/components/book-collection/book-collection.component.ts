import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../../state/books/models/books.model';

@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.component.html',
  styleUrls: ['./book-collection.component.scss'],
})
export class BookCollectionComponent {
  @Input() books: ReadonlyArray<Book> = [];
  @Output() remove = new EventEmitter<string>();
}