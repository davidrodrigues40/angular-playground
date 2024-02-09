import { Book } from 'src/app/interfaces/models/books/book.';

import { Component, Input } from '@angular/core';

@Component({
   selector: 'app-book-item',
   templateUrl: './book-item.component.html',
   styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent
{
   @Input() book: Book = {
      id: '',
      volumeInfo: {
         title: '',
         authors: []
      }
   };
}
