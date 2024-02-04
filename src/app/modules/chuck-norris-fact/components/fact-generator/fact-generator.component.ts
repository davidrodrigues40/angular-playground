import { ChuckNorrisFact } from 'src/app/state/chuck-norris/models/chuck-norris-fact';
import { FactCategory } from 'src/app/state/chuck-norris/models/fact-category';
import { ChuckNorrisSignalService } from 'src/app/state/chuck-norris/service/chuck-norris-signal.service';

import { Component, effect } from '@angular/core';

@Component({
   selector: 'app-fact-generator',
   templateUrl: './fact-generator.component.html',
   styleUrls: ['./fact-generator.component.scss']
})
export class FactGeneratorComponent
{
   public fact: Readonly<ChuckNorrisFact> | null = this._service.observables.fact;
   public categories: ReadonlyArray<FactCategory> | null = this._service.observables.categories;
   public selectedCategory: FactCategory | null = this._service.observables.selectedCategory;

   constructor(private readonly _service: ChuckNorrisSignalService)
   {
      effect(() =>
      {
         this.fact = this._service.observables.fact;
         this.categories = this._service.observables.categories;
         this.selectedCategory = this._service.observables.selectedCategory;
      });
   }

   getFact(): void
   {
      this._service.events.fetchFact();
   }

   getFactForCategory(): void
   {
      if (this.selectedCategory)
         this._service.events.fetchFactForCategory(this.selectedCategory);
   }

   categorySelected(category: FactCategory): void
   {
      this._service.events.setSelectedCategory(category);
   }
}
