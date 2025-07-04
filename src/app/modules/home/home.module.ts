import { TitleComponent } from 'src/app/components/title/title.component';
import { Title2Component } from 'src/app/components/title2/title2.component';
import { Title3Component } from 'src/app/components/title3/title3.component';
import { Title4Component } from 'src/app/components/title4/title4.component';
import { DataFlowDetailsComponent } from 'src/app/modules/home/components/data-flow-details/data-flow-details.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { StateCanvasComponent } from '../../canvas/state-canvas/state-canvas.component';
import { HomeMenuComponent } from '../../footers/home-menu/home-menu.component';
import { NgrxDetailsComponent } from './components/ngrx-details/ngrx-details.component';
import { HomeRoutingModule } from './home-routing.module';
import { DataFlowComponent } from './views/data-flow/data-flow.component';
import { NgrxViewComponent } from './views/ngrx-view/ngrx-view.component';
import { SignalsDataFlowCanvasComponent } from 'src/app/canvas/signals-data-flow-canvas/signals-data-flow-canvas.component';

@NgModule({
    imports: [
        HomeRoutingModule,
        DataFlowComponent,
        NgrxViewComponent,
        CommonModule,
        TitleComponent,
        Title2Component,
        Title3Component,
        Title4Component,
        MatButtonModule,
        DataFlowDetailsComponent,
        HomeMenuComponent,
        StateCanvasComponent,
        NgrxDetailsComponent,
        SignalsDataFlowCanvasComponent
    ]
})
export class HomeModule { }