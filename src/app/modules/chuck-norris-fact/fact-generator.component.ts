import { ChuckNorrisFact } from 'src/app/modules/chuck-norris-fact/models/chuck-norris-fact';
import { FactCategory } from 'src/app/modules/chuck-norris-fact/models/fact-category';

import {
   ChangeDetectionStrategy,
   Component,
   WritableSignal
} from '@angular/core';
import { ChuckNorrisFactState } from 'src/app/modules/chuck-norris-fact/chuck-norris.state';
import { ChuckNorrisFactsService } from 'src/app/modules/chuck-norris-fact/services/chuck-norris-facts.service';
import { Title2Component } from 'src/app/components/title2/title2.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { FactCategoriesComponent } from './components/fact-categories/fact-categories.component';
import { FactComponent } from './components/fact/fact.component';
import { ActionsComponent } from './components/actions/actions.component';

@Component({
   selector: 'app-fact-generator',
   templateUrl: './fact-generator.component.html',
   styleUrls: ['./fact-generator.component.scss'],
   standalone: true,
   imports: [
      FactCategoriesComponent,
      LoadingComponent,
      Title2Component,
      FactComponent,
      ActionsComponent
   ],
   providers: [ChuckNorrisFactsService],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class FactGeneratorComponent {
   protected fact: WritableSignal<Readonly<ChuckNorrisFact | null>> = ChuckNorrisFactState.fact;
   protected selectedCategory: WritableSignal<FactCategory | null> = ChuckNorrisFactState.selectedCategory;
   protected favoriteFacts: WritableSignal<ReadonlyArray<ChuckNorrisFact>> = ChuckNorrisFactState.favoriteFacts;
   protected isLoading: WritableSignal<boolean> = ChuckNorrisFactState.loading;

   constructor() {
   }

   categorySelected(category: FactCategory): void {
      ChuckNorrisFactState.selectedCategory.set(category);
   }
}
