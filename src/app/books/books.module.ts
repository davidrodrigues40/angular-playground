import { NgModule } from '@angular/core';
import { BookCollectionComponent } from './components/book-collection/book-collection.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { StoreModule } from '@ngrx/store';
import { booksFeatureKey, booksReducer, collectionFeatureKey } from '../state/books/books.reducer';
import { CommonModule } from '@angular/common';
import { collectionReducer } from '../state/books/collection.reducer';
import { BooksComponent } from './components/books/books.component';
import { BookEffects } from '../state/books/books.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    BookListComponent,
    BookCollectionComponent,
    BooksComponent],
  imports: [
    StoreModule.forFeature(booksFeatureKey, booksReducer),
    StoreModule.forFeature(collectionFeatureKey, collectionReducer),
    EffectsModule.forFeature([BookEffects]),
    EffectsModule.forRoot(),
    StoreModule.forRoot({}),
    CommonModule
  ]
})
export class BooksModule { }
