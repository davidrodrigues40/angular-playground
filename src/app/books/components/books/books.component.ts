import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BooksState } from 'src/app/state/app.state';
import { Book } from 'src/app/state/books/books.model';
import * as booksReducers from '../../../state/books/books.reducer';
import * as actions from '../../../state/books/books.actions';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  constructor(private store: Store<BooksState>) { }

  books$: Observable<ReadonlyArray<Book>> = this.store.select(booksReducers.getBooks);
  collection$: Observable<ReadonlyArray<Book>> = this.store.select(booksReducers.getCollection);

  ngOnInit() {
    this.store.dispatch(actions.bookActions.getAll());
    this.store.dispatch(actions.collectionActions.getAll());
  }

  onAdd(bookId: string): void {
    this.store.dispatch(actions.collectionActions.addBook({ payload: bookId }));
  }

  onRemove(bookId: string): void {
    this.store.dispatch(actions.collectionActions.removeBook({ payload: bookId }));
  }

  onClear(): void {
    this.store.dispatch(actions.collectionActions.clearCollection());
  }
}
