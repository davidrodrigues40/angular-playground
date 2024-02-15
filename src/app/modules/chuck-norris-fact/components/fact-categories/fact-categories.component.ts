import { FactCategory } from 'src/app/interfaces/models/chuck-norris/fact-category';
import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { ChuckNorrisSignalService } from 'src/app/state/chuck-norris/service/chuck-norris-signal.service';

import
{
   Component,
   EnvironmentInjector,
   EventEmitter,
   inject,
   OnInit,
   Output,
   runInInjectionContext
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
   selector: 'app-fact-categories',
   templateUrl: './fact-categories.component.html'
})
export class FactCategoriesComponent implements OnInit
{
   options: SignalObject<ReadonlyArray<FactCategory> | null> = { value: this._service.data.categories };
   @Output() categorySelected: EventEmitter<FactCategory> = new EventEmitter<FactCategory>();

   private _injector: EnvironmentInjector = inject(EnvironmentInjector);

   constructor(private readonly _service: ChuckNorrisSignalService)
   { }

   ngOnInit(): void
   {
      this.loadCategories();
   }

   selectionChange(event: MatSelectChange): void
   {
      this.categorySelected.emit(event.value);
   }

   private loadCategories(): void
   {
      runInInjectionContext(this._injector, () =>
      {
         this._service.effects.bindCategories(this.options);
      });
      this._service.methods.fetchCategories();
   }
}
