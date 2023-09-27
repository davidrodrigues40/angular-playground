import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { BooksModule } from './books/books.module';
import { BooksComponent } from './books/components/books/books.component';
import { ChuckNorrisFactModule } from './chuck-norris-fact/chuck-norris-fact.module';
import { FactGeneratorComponent } from './chuck-norris-fact/components/fact-generator/fact-generator.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MenuModule } from './menu/menu.module';
import { BowlingViewComponent } from './modules/bowling/view/bowling-view.component';
import { ScoreboardComponent } from './modules/scoreboard/components/scoreboard/scoreboard.component';
import { ScoreboardModule } from './modules/scoreboard/scoreboard.module';
import { reducers } from './state/app.reducers';

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
    path: 'bowling',
    component: BowlingViewComponent,
    loadChildren: () => import('./modules/bowling/bowling.module').then(m => m.BowlingModule)
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