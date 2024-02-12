import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterHostDirective } from './directives/footer/footer-host.directive';
import { BooksModule } from './modules/books/books.module';
import { BowlingModule } from './modules/bowling/bowling.module';
import { ChuckNorrisFactModule } from './modules/chuck-norris-fact/chuck-norris-fact.module';
import { HomeModule } from './modules/home/home.module';
import { MenuModule } from './modules/menu/menu.module';
import { reducers } from './state/app.reducers';
import { NotificationService } from './services/notification/notification.service';

@NgModule({
   imports: [
      AppRoutingModule,
      StoreModule.forRoot(reducers),
      EffectsModule.forRoot(),
      BrowserAnimationsModule,
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BooksModule,
      ChuckNorrisFactModule,
      BowlingModule,
      HomeModule,
      MenuModule,
      FooterHostDirective
   ],
   providers: [NotificationService],
   declarations: [AppComponent],
   bootstrap: [AppComponent],
})
export class AppModule { }