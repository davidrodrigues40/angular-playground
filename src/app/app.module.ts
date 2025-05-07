import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FooterHostDirective } from './directives/footer/footer-host.directive';
import { NotificationService } from './services/notification/notification.service';
import { MenuComponent } from './modules/menu/components/menu/menu.component';
import { AppComponent } from './app.component';
import { BowlingViewComponent } from './modules/bowling/view/bowling-view.component';

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        MenuComponent,
        FooterHostDirective,
        BowlingViewComponent,
    ],
    providers: [NotificationService, provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }