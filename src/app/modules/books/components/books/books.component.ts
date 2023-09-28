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

  books$: Observable<ReadonlyArray<Book>> = this._service.observables.books$;
  collection$: Observable<ReadonlyArray<Book>> = this._service.observables.collection$;

  ngOnInit() {
    this._service.events.fetchBooks().emit();
    this._service.events.fetchCollections().emit();
  }

  onAdd(bookId: string): void {
    this._service.events.addBook(bookId).emit();
  }

  onRemove(bookId: string): void {
    this._service.events.removeBook(bookId).emit();
  }

  onClear(): void {
    this._service.events.clearCollection().emit();
  }
}
