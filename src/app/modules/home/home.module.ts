import { TitleComponent } from 'src/app/components/title/title.component';
import { Title2Component } from 'src/app/components/title2/title2.component';
import { Title3Component } from 'src/app/components/title3/title3.component';
import { DataFlowDetailsComponent } from 'src/app/modules/home/components/data-flow-details/data-flow-details.component';
import { HomeMenuService } from 'src/app/services/home-menu/home-menu.service';
import { HomeMenuEffects } from 'src/app/state/home-menu/home-menu.effects';
import { HomeMenuStateService } from 'src/app/state/home-menu/services/home-menu-state.service';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EffectsModule } from '@ngrx/effects';

import { HomeMenuComponent } from './components/home-menu/home-menu.component';
import { NgrxCanvasComponent } from './components/ngrx-state-management/ngrx-canvas/ngrx-canvas.component';
import { NgrxDetailsComponent } from './components/ngrx-state-management/ngrx-details/ngrx-details.component';
import { StateCanvasComponent } from './components/state-canvas/state-canvas.component';
import { StateDetailsComponent } from './components/state-details/state-details.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DataFlowComponent } from './views/data-flow/data-flow.component';
import { HomeDetailsComponent } from './views/home-details/home-details.component';
import { NgrxViewComponent } from './views/ngrx-view/ngrx-view.component';

@NgModule({
    declarations: [
        HomeComponent,
        HomeDetailsComponent,
        NgrxViewComponent,
        DataFlowComponent,
        NgrxCanvasComponent,
        NgrxDetailsComponent,
        StateDetailsComponent,
    ],
    imports: [
        EffectsModule.forFeature([HomeMenuEffects]),
        HomeRoutingModule,
        CommonModule,
        TitleComponent,
        Title2Component,
        Title3Component,
        MatButtonModule,
        DataFlowDetailsComponent,
        HomeMenuComponent,
        StateCanvasComponent
    ],
    providers: [
        HomeMenuStateService,
        HomeMenuService]
})
export class HomeModule { }
