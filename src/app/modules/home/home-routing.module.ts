import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDetailsComponent } from './views/home-details/home-details.component';
import { NgrxViewComponent } from './views/ngrx-view/ngrx-view.component';
import { DataFlowComponent } from './views/data-flow/data-flow.component';

const homeRoutes: Routes = [
    {
        path: 'ngrx',
        component: NgrxViewComponent
    },
    {
        path: 'dataflow',
        component: DataFlowComponent
    },
    {
        path: '',
        component: HomeDetailsComponent
    }
]

@NgModule({
    declarations: [],
    exports: [RouterModule],
    imports: [
        RouterModule.forChild(homeRoutes),
    ]
})
export class HomeRoutingModule { }
