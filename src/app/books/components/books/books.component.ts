import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GoogleBooksService } from 'src/app/services/books/books.service';
import { BookEvent } from 'src/app/state/books/book.events';
import { Book } from 'src/app/state/books/books.model';
import { selectBookCollection } from 'src/app/state/books/books.selectors';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  constructor(private booksService: GoogleBooksService, private store: Store<{ books: Book[] }>) { }

  books$: Observable<Book[]> = this.store.select(state => state.books);
  bookCollection$ = this.store.select(selectBookCollection);

  ngOnInit() {
    this.store.dispatch({ type: BookEvent.getBooks });
  }

  onAdd(bookId: string) {
    this.booksService.addBook(bookId);
  }

  onRemove(bookId: string) {
    this.booksService.removeBook(bookId);
  }
}
