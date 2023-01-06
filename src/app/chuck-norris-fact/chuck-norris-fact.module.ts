import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ChuckNorrisEffects } from '../state/chuck-norris/chuck-norris.effects';
import { FactGeneratorComponent } from './components/fact-generator/fact-generator.component';
import { FactComponent } from './components/fact/fact.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonComponentModule } from '../common-components/common.module';
import { FactCategoriesComponent } from './components/fact-categories/fact-categories.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    FactGeneratorComponent,
    FactComponent,
    FactCategoriesComponent
  ],
  imports: [
    CommonModule,
    CommonComponentModule,
    EffectsModule.forFeature([ChuckNorrisEffects]),
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class ChuckNorrisFactModule { }
