import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EffectsModule } from '@ngrx/effects';
import { GoogleBooksService } from 'src/app/services/books/books.service';
import { BookEffects, CollectionEffects } from '../../state/books/books.effects';
import { BookCollectionComponent } from './components/book-collection/book-collection.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BooksComponent } from './components/books/books.component';
import { BookStateService } from 'src/app/state/books/service/book-state.service';
import { EmptyDataComponent } from 'src/app/components/empty-data/empty-data.component';
import { TitleComponent } from 'src/app/components/title/title.component';

@NgModule({
    declarations: [
        BookListComponent,
        BookCollectionComponent,
        BooksComponent,
        BookItemComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        TitleComponent,
        EmptyDataComponent,
        EffectsModule.forFeature([BookEffects, CollectionEffects]),
    ],
    providers: [
        GoogleBooksService,
        BookStateService
    ]
})
export class BooksModule { }
