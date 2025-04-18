import { FactCategory } from 'src/app/interfaces/models/chuck-norris/fact-category';

import {
   ChangeDetectionStrategy,
   Component,
   EventEmitter,
   OnInit,
   Output,
   WritableSignal
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ChuckNorrisFactsService } from 'src/app/services/chuck-norris/chuck-norris-facts.service';
import { ChuckNorrisFactState } from 'src/app/state/chuck-norris.state';

@Component({
   selector: 'app-fact-categories',
   templateUrl: './fact-categories.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class FactCategoriesComponent implements OnInit {
   options: WritableSignal<ReadonlyArray<FactCategory> | null> = ChuckNorrisFactState.categories;
   @Output() categorySelected: EventEmitter<FactCategory> = new EventEmitter<FactCategory>();

   constructor(private readonly _service: ChuckNorrisFactsService) { }

   ngOnInit(): void {
      this.loadCategories();
   }

   selectionChange(event: MatSelectChange): void {
      this.categorySelected.emit(event.value);
   }

   private loadCategories(): void {
      this._service.getCategories();
   }
}
