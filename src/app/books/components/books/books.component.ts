import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GoogleBooksService } from 'src/app/services/books/books.service';
import { BooksState } from 'src/app/state/app.state';
import { Book } from 'src/app/state/books/books.model';
import * as booksReducers from '../../../state/books/books.reducer';
import * as booksActions from '../../../state/books/books.actions';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  constructor(private booksService: GoogleBooksService, private store: Store<BooksState>) { }

  books$: Observable<ReadonlyArray<Book>> = this.store.select(booksReducers.getBooks);
  collection$: Observable<ReadonlyArray<Book>> = this.store.select(booksReducers.getCollection);

  ngOnInit() {
    this.store.dispatch(booksActions.GetAllBooks());
    this.store.dispatch(booksActions.GetCollection());
  }

  onAdd(bookId: string): void {
    this.store.dispatch(booksActions.AddBookToCollection({ payload: bookId }));
  }

  onRemove(bookId: string): void {
    this.store.dispatch(booksActions.RemoveBookFromCollection({ payload: bookId }));
  }

  onClear(): void {
    this.store.dispatch(booksActions.ClearCollection());
  }
}
