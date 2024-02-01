import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmptyDataComponent } from 'src/app/components/empty-data/empty-data.component';
import { Book } from 'src/app/state/books/models/books.model';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent
{
    @Input() books: ReadonlyArray<Book> = [];
    @Output() add = new EventEmitter<string>();
}