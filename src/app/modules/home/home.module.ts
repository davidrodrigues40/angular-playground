import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './views/home/home.component';
import { CommonComponentModule } from 'src/app/common-components/common.module';
import { HomeMenuComponent } from './components/home-menu/home-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { HomeRoutingModule } from './home-routing.module';
import { HomeDetailsComponent } from './views/home-details/home-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgrxViewComponent } from './views/ngrx-view/ngrx-view.component';

@NgModule({
    declarations: [
        HomeComponent,
        HomeMenuComponent,
        HomeDetailsComponent,
        NgrxViewComponent
    ],
    imports: [
        HomeRoutingModule,
        CommonModule,
        CommonComponentModule,
        MatButtonModule
    ]
})
export class HomeModule { }
