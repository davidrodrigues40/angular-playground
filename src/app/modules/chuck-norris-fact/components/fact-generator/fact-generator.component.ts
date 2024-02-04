import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { ChuckNorrisFact } from 'src/app/state/chuck-norris/models/chuck-norris-fact';
import { FactCategory } from 'src/app/state/chuck-norris/models/fact-category';
import { ChuckNorrisSignalService } from 'src/app/state/chuck-norris/service/chuck-norris-signal.service';

import { Component } from '@angular/core';

@Component({
   selector: 'app-fact-generator',
   templateUrl: './fact-generator.component.html',
   styleUrls: ['./fact-generator.component.scss']
})
export class FactGeneratorComponent
{
   public fact: SignalObject<Readonly<ChuckNorrisFact | null>> = { value: this._service.observables.fact };
   public selectedCategory: SignalObject<FactCategory | null> = { value: this._service.observables.selectedCategory };

   constructor(private readonly _service: ChuckNorrisSignalService)
   {
      this._service.effects.bindFact(this.fact);
      this._service.effects.bindSelectedCategory(this.selectedCategory);
   }

   getFact(): void
   {
      this._service.events.fetchFact();
   }

   getFactForCategory(): void
   {
      if (this.selectedCategory)
         this._service.events.fetchFactForCategory(this.selectedCategory.value);
      else
         this.getFact();
   }

   categorySelected(category: FactCategory): void
   {
      this._service.events.setSelectedCategory(category);
   }
}
