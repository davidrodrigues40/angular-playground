import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterHostDirective } from './directives/footer/footer-host.directive';
import { BowlingModule } from './modules/bowling/bowling.module';
import { ChuckNorrisFactModule } from './modules/chuck-norris-fact/chuck-norris-fact.module';
import { HomeModule } from './modules/home/home.module';
import { MenuModule } from './modules/menu/menu.module';
import { NotificationService } from './services/notification/notification.service';

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ChuckNorrisFactModule,
        BowlingModule,
        HomeModule,
        MenuModule,
        FooterHostDirective], providers: [NotificationService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }