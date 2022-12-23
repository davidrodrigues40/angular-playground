import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { booksReducer } from './state/books/books.reducer';
import { collectionReducer } from './state/books/collection.reducer';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookCollectionComponent } from './book-collection/book-collection.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { ScoreboardModule } from './state/game/scoreboard.module';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'scoreboard',
    component: ScoreboardComponent
  },
  {
    path: '**',
    component: BooksComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    StoreModule.forRoot({ books: booksReducer, collection: collectionReducer }),
    ScoreboardModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [AppComponent, BookListComponent, BookCollectionComponent, LoginPageComponent, BooksComponent, ScoreboardComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }