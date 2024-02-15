import { ChuckNorrisFact } from 'src/app/interfaces/models/chuck-norris/chuck-norris-fact';
import { FactCategory } from 'src/app/interfaces/models/chuck-norris/fact-category';
import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { ChuckNorrisSignalService } from 'src/app/state/chuck-norris/service/chuck-norris-signal.service';

import
{
   Component,
   EnvironmentInjector,
   inject,
   OnInit,
   runInInjectionContext
} from '@angular/core';

@Component({
   selector: 'app-fact-generator',
   templateUrl: './fact-generator.component.html',
   styleUrls: ['./fact-generator.component.scss']
})
export class FactGeneratorComponent implements OnInit
{
   private injector: EnvironmentInjector = inject(EnvironmentInjector);
   public fact: SignalObject<Readonly<ChuckNorrisFact | null>> = { value: this._service.data.fact };
   public selectedCategory: SignalObject<FactCategory | null> = { value: this._service.data.selectedCategory };

   constructor(private readonly _service: ChuckNorrisSignalService)
   { }

   ngOnInit(): void
   {
      this.bindData();
   }

   bindData(): void
   {
      runInInjectionContext(this.injector, () =>
      {
         this._service.effects.bindFact(this.fact);
         this._service.effects.bindSelectedCategory(this.selectedCategory);
      });
   }

   getFact(): void
   {
      this._service.methods.fetchFact();
   }

   getFactForCategory(): void
   {
      if (this.selectedCategory?.value)
         this._service.methods.fetchFactForCategory(this.selectedCategory.value);
      else
         this.getFact();
   }

   categorySelected(category: FactCategory): void
   {
      this._service.methods.setSelectedCategory(category);
   }
}
