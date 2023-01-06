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
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './state/app.reducers';
import { FactGeneratorComponent } from './chuck-norris-fact/components/fact-generator/fact-generator.component';
import { ChuckNorrisFactModule } from './chuck-norris-fact/chuck-norris-fact.module';
import { MenuModule } from './menu/menu.module';

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
    path: 'facts',
    component: FactGeneratorComponent
  },
  {
    path: '**',
    component: BooksComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BooksModule,
    ScoreboardModule,
    ChuckNorrisFactModule,
    MenuModule
  ],
  declarations: [AppComponent, LoginPageComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }