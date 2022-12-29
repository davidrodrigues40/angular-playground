import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { GoogleBooksService } from 'src/app/services/books/books.service';
import { Book } from 'src/app/state/books/books.model';
import { selectBooks, selectBookCollection } from 'src/app/state/books/books.selectors';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  constructor(private booksService: GoogleBooksService, private store: Store<Book>) { }

  books$ = this.store.select(selectBooks);
  bookCollection$ = this.store.select(selectBookCollection);

  ngOnInit() {
    this.booksService.getBooks();
  }

  onAdd(bookId: string) {
    this.booksService.addBook(bookId);
  }

  onRemove(bookId: string) {
    this.booksService.removeBook(bookId);
  }
}
