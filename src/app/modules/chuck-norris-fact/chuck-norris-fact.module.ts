import { EmptyDataComponent } from 'src/app/components/empty-data/empty-data.component';
import { Title2Component } from 'src/app/components/title2/title2.component';
import { ChuckNorrisFactsService } from 'src/app/services/chuck-norris/chuck-norris-facts.service';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { FactCategoriesComponent } from './components/fact-categories/fact-categories.component';
import { FactGeneratorComponent } from './components/fact-generator/fact-generator.component';
import { FactComponent } from './components/fact/fact.component';

@NgModule({
   declarations: [
      FactGeneratorComponent,
      FactCategoriesComponent
   ],
   imports: [
      CommonModule,
      EmptyDataComponent,
      MatButtonModule,
      MatFormFieldModule,
      MatSelectModule,
      Title2Component,
      FactComponent
   ],
   providers: [ChuckNorrisFactsService]
})
export class ChuckNorrisFactModule { }
