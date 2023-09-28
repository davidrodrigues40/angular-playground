import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { BooksModule } from './modules/books/books.module';
import { BooksComponent } from './modules/books/components/books/books.component';
import { BowlingModule } from './modules/bowling/bowling.module';
import { BowlingViewComponent } from './modules/bowling/view/bowling-view.component';
import { ChuckNorrisFactModule } from './modules/chuck-norris-fact/chuck-norris-fact.module';
import { FactGeneratorComponent } from './modules/chuck-norris-fact/components/fact-generator/fact-generator.component';
import { MenuModule } from './modules/menu/menu.module';
import { reducers } from './state/app.reducers';

export const routes: Routes = [
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
    ChuckNorrisFactModule,
    BowlingModule,
    MenuModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }