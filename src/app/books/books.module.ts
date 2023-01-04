import { NgModule } from '@angular/core';
import { BookCollectionComponent } from './components/book-collection/book-collection.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './components/books/books.component';
import { reducers } from '../state/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects, CollectionEffects } from '../state/books/books.effects';

@NgModule({
  declarations: [
    BookListComponent,
    BookCollectionComponent,
    BooksComponent],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([BookEffects, CollectionEffects]),
  ]
})
export class BooksModule { }
