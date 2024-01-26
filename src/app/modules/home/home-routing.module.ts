import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDetailsComponent } from './views/home-details/home-details.component';
import { NgrxViewComponent } from './views/ngrx-view/ngrx-view.component';

const homeRoutes: Routes = [
    {
        path: 'ngrx',
        component: NgrxViewComponent
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
