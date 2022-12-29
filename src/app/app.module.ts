import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ScoreboardModule } from './scoreboard/scoreboard.module';
import { BooksComponent } from './books/components/books/books.component';
import { ScoreboardComponent } from './scoreboard/components/scoreboard/scoreboard.component';
import { BooksModule } from './books/books.module';

export const routes: Routes = [
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
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BooksModule,
    ScoreboardModule
  ],
  declarations: [AppComponent, LoginPageComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }