import { EmptyDataComponent } from 'src/app/components/empty-data/empty-data.component';
import { TitleComponent } from 'src/app/components/title/title.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
import { AuthorComponent } from './components/author/author.component';
import { BaseBookListComponent } from './components/base-book-list/base-book-list.component';
import { BookCollectionComponent } from './components/book-collection/book-collection.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BooksComponent } from './components/books/books.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
   declarations: [
      BookListComponent,
      BookCollectionComponent,
      BooksComponent,
      BookItemComponent,
      BaseBookListComponent],
   imports: [
      CommonModule,
      MatButtonModule,
      MatIconModule,
      TitleComponent,
      EmptyDataComponent,
      MatProgressSpinnerModule,
      AuthorComponent
   ]
})
export class BooksModule { }
