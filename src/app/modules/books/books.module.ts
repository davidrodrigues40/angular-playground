import { EmptyDataComponent } from 'src/app/components/empty-data/empty-data.component';
import { TitleComponent } from 'src/app/components/title/title.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
import { AuthorComponent } from './components/author/author.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { BooksComponent } from './components/books/books.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Title2Component } from 'src/app/components/title2/title2.component';
import { Title4Component } from 'src/app/components/title4/title4.component';

@NgModule({
   declarations: [
      BooksComponent,
      BookItemComponent,
      BookListComponent],
   imports: [
      CommonModule,
      MatButtonModule,
      MatIconModule,
      TitleComponent,
      EmptyDataComponent,
      MatProgressSpinnerModule,
      AuthorComponent,
      Title2Component,
      Title4Component
   ]
})
export class BooksModule { }
