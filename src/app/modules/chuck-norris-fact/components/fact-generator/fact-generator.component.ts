import { ChuckNorrisFact } from 'src/app/interfaces/models/chuck-norris/chuck-norris-fact';
import { FactCategory } from 'src/app/interfaces/models/chuck-norris/fact-category';

import {
   ChangeDetectionStrategy,
   Component,
   WritableSignal
} from '@angular/core';
import { ChuckNorrisFactState } from 'src/app/state/chuck-norris.state';
import { ChuckNorrisFactsService } from 'src/app/services/chuck-norris/chuck-norris-facts.service';

@Component({
   selector: 'app-fact-generator',
   templateUrl: './fact-generator.component.html',
   styleUrls: ['./fact-generator.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush

})
export class FactGeneratorComponent {
   public fact: WritableSignal<Readonly<ChuckNorrisFact | null>> = ChuckNorrisFactState.fact;
   public selectedCategory: WritableSignal<FactCategory | null> = ChuckNorrisFactState.selectedCategory;
   public favoriteFacts: WritableSignal<ReadonlyArray<ChuckNorrisFact>> = ChuckNorrisFactState.favoriteFacts;

   constructor(private readonly _service: ChuckNorrisFactsService) { }

   getFact(): void {
      this._service.getFact();
   }

   getFactForCategory(): void {
      const category: FactCategory | null = this.selectedCategory();

      if (category !== null)
         this._service.getFactForCategory(category);
      else
         this.getFact();
   }

   getFavoriteFact(): void {
      this._service.getFavoriteFact(this.selectedCategory()?.name ?? 'random');
   }

   getAllFavoriteFacts(): void {
      this._service.getFavoriteFacts();
   }

   categorySelected(category: FactCategory): void {
      ChuckNorrisFactState.selectedCategory.set(category);
   }
}
