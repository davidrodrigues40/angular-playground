import { EmptyDataComponent } from 'src/app/components/empty-data/empty-data.component';
import { TitleComponent } from 'src/app/components/title/title.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { BookCollectionComponent } from './components/book-collection/book-collection.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BooksComponent } from './components/books/books.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
   declarations: [
      BookListComponent,
      BookCollectionComponent,
      BooksComponent,
      BookItemComponent],
   imports: [
      CommonModule,
      MatButtonModule,
      MatIconModule,
      TitleComponent,
      EmptyDataComponent,
   ]
})
export class BooksModule { }
