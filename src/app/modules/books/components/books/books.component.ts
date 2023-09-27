import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/state/books/models/books.model';
import { BookStateService } from 'src/app/state/books/service/book-state.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  constructor(private readonly _service: BookStateService) { }

  books$: Observable<ReadonlyArray<Book>> = this._service.books$;
  collection$: Observable<ReadonlyArray<Book>> = this._service.collection$;

  ngOnInit() {
    this._service.fetchBooks$();
    this._service.fetchCollections$();
  }

  onAdd(bookId: string): void {
    this._service.addBook$(bookId);
  }

  onRemove(bookId: string): void {
    this._service.removeBook$(bookId);
  }

  onClear(): void {
    this._service.clearCollection$();
  }
}
