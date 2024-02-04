import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { FactCategory } from 'src/app/state/chuck-norris/models/fact-category';
import { ChuckNorrisSignalService } from 'src/app/state/chuck-norris/service/chuck-norris-signal.service';

import { Component, EventEmitter, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
   selector: 'app-fact-categories',
   templateUrl: './fact-categories.component.html'
})
export class FactCategoriesComponent
{
   options: SignalObject<ReadonlyArray<FactCategory> | null> = { value: this._service.observables.categories };
   @Output() categorySelected: EventEmitter<FactCategory> = new EventEmitter<FactCategory>();

   constructor(private readonly _service: ChuckNorrisSignalService)
   {
      this.loadCategories();
   }

   selectionChange(event: MatSelectChange): void
   {
      this.categorySelected.emit(event.value);
   }

   private loadCategories(): void
   {
      this._service.effects.bindCategories(this.options);
      this._service.events.fetchCategories();
   }
}
