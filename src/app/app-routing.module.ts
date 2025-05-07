import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './modules/books/components/books/books.component';
import { BowlingViewComponent } from './modules/bowling/view/bowling-view.component';
import { FactGeneratorComponent } from './modules/chuck-norris-fact/components/fact-generator/fact-generator.component';
import { HomeComponent } from './modules/home/home.component';
import { CalculatorComponent } from './modules/calculator/view/calculator.component';

const routes: Routes = [
    {
        path: 'facts',
        component: FactGeneratorComponent
    },
    {
        path: 'bowling',
        component: BowlingViewComponent,
    },
    {
        path: 'books',
        component: BooksComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    },
    {
        path: 'chuck-norris-facts',
        component: FactGeneratorComponent,
    },
    {
        path: 'calculator',
        component: CalculatorComponent,
    },
    {
        path: '**',
        redirectTo: 'home',
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
