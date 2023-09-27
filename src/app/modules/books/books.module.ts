import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EffectsModule } from '@ngrx/effects';
import { GoogleBooksService } from 'src/app/services/books/books.service';
import { CommonComponentModule } from '../../common-components/common.module';
import { BookEffects, CollectionEffects } from '../../state/books/books.effects';
import { BookCollectionComponent } from './components/book-collection/book-collection.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BooksComponent } from './components/books/books.component';
import { BookStateService } from 'src/app/state/books/service/book-state.service';

@NgModule({
  declarations: [
    BookListComponent,
    BookCollectionComponent,
    BooksComponent,
    BookItemComponent],
  imports: [
    CommonModule,
    CommonComponentModule,
    MatButtonModule,
    EffectsModule.forFeature([BookEffects, CollectionEffects]),
  ],
  providers: [
    GoogleBooksService,
    BookStateService
  ]
})
export class BooksModule { }
