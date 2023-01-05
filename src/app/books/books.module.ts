import { NgModule } from '@angular/core';
import { BookCollectionComponent } from './components/book-collection/book-collection.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './components/books/books.component';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects, CollectionEffects } from '../state/books/books.effects';

@NgModule({
  declarations: [
    BookListComponent,
    BookCollectionComponent,
    BooksComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([BookEffects, CollectionEffects]),
  ]
})
export class BooksModule { }
