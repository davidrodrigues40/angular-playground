import { NgModule } from '@angular/core';
import { BookCollectionComponent } from './components/book-collection/book-collection.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './components/books/books.component';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects, CollectionEffects } from '../state/books/books.effects';
import { MatButtonModule } from '@angular/material/button';
import { CommonComponentModule } from '../common-components/common.module';
import { BootItemComponent } from './components/boot-item/boot-item.component';

@NgModule({
  declarations: [
    BookListComponent,
    BookCollectionComponent,
    BooksComponent,
    BootItemComponent],
  imports: [
    CommonModule,
    CommonComponentModule,
    MatButtonModule,
    EffectsModule.forFeature([BookEffects, CollectionEffects]),
  ]
})
export class BooksModule { }
