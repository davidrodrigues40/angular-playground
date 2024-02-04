import { FactCategory } from 'src/app/state/chuck-norris/models/fact-category';
import { ChuckNorrisSignalService } from 'src/app/state/chuck-norris/service/chuck-norris-signal.service';

import { Component, effect, EventEmitter, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
   selector: 'app-fact-categories',
   templateUrl: './fact-categories.component.html'
})
export class FactCategoriesComponent
{
   options: ReadonlyArray<FactCategory> | null = [];
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
      effect(() =>
      {
         this.options = this._service.observables.categories;
      });

      this._service.events.fetchCategories();
   }
}
