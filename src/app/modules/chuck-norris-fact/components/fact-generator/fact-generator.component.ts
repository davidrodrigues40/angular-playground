import { ChuckNorrisFact } from 'src/app/interfaces/models/chuck-norris/chuck-norris-fact';
import { FactCategory } from 'src/app/interfaces/models/chuck-norris/fact-category';
import { ChuckNorrisSignalService } from 'src/app/state/chuck-norris/service/chuck-norris-signal.service';

import
{
   ChangeDetectionStrategy,
   Component,
   WritableSignal
} from '@angular/core';
import { chuckNorrisSignals } from 'src/app/state/chuck-norris/chuck-norris.signals';

@Component({
   selector: 'app-fact-generator',
   templateUrl: './fact-generator.component.html',
   styleUrls: ['./fact-generator.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush

})
export class FactGeneratorComponent
{
   public fact: WritableSignal<Readonly<ChuckNorrisFact | null>> = chuckNorrisSignals().fact;
   public selectedCategory: WritableSignal<FactCategory | null> = chuckNorrisSignals().selectedCategory;

   constructor(private readonly _service: ChuckNorrisSignalService)
   { }

   getFact(): void
   {
      this._service.fetchFact();
   }

   getFactForCategory(): void
   {
      if (this.selectedCategory())
         this._service.fetchFactForCategory(this.selectedCategory());
      else
         this.getFact();
   }

   categorySelected(category: FactCategory): void
   {
      this._service.setSelectedCategory(category);
   }
}
