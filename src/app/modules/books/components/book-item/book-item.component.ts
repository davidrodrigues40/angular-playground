import { Book } from 'src/app/modules/books/models/book.';

import { Component, Input } from '@angular/core';
import { Title4Component } from 'src/app/components/title4/title4.component';

@Component({
   selector: 'app-book-item',
   templateUrl: './book-item.component.html',
   styleUrls: ['./book-item.component.scss'],
   standalone: true,
   imports: [Title4Component],
})
export class BookItemComponent {
   @Input() book: Book = {
      id: '',
      volumeInfo: {
         title: '',
         authors: []
      }
   };
}
