import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { GoogleBooksService } from './services/books/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private booksService: GoogleBooksService, private store: Store) { }

  ngOnInit() {
    //this.booksService.getBooks();
  }

  onAdd(bookId: string) {
    this.booksService.addBook(bookId);
  }

  onRemove(bookId: string) {
    this.booksService.removeBook(bookId);
  }
}