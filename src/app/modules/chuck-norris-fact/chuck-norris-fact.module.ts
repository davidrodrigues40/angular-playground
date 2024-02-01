import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { EffectsModule } from '@ngrx/effects';
import { ChuckNorrisFactsService } from 'src/app/services/chuck-norris/chuck-norris-facts.service';
import { ChuckNorrisStateService } from 'src/app/state/chuck-norris/service/chuck-norris-state.service';
import { ChuckNorrisEffects } from '../../state/chuck-norris/chuck-norris.effects';
import { FactCategoriesComponent } from './components/fact-categories/fact-categories.component';
import { FactGeneratorComponent } from './components/fact-generator/fact-generator.component';
import { FactComponent } from './components/fact/fact.component';
import { EmptyDataComponent } from 'src/app/components/empty-data/empty-data.component';

@NgModule({
    declarations: [
        FactGeneratorComponent,
        FactComponent,
        FactCategoriesComponent
    ],
    imports: [
        CommonModule,
        EmptyDataComponent,
        EffectsModule.forFeature([ChuckNorrisEffects]),
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule
    ],
    providers: [ChuckNorrisFactsService, ChuckNorrisStateService]
})
export class ChuckNorrisFactModule { }
