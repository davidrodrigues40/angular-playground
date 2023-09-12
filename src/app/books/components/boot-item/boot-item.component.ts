import { Component, Input } from '@angular/core';
import { Book } from 'src/app/state/books/models/books.model';

@Component({
  selector: 'app-boot-item',
  templateUrl: './boot-item.component.html',
  styleUrls: ['./boot-item.component.scss']
})
export class BootItemComponent {
  @Input() book: Book = {
    id: '',
    volumeInfo: {
      title: '',
      authors: []
    }
  };
}
