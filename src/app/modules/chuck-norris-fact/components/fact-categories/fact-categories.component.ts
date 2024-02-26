import { FactCategory } from 'src/app/interfaces/models/chuck-norris/fact-category';
import { ChuckNorrisSignalService } from 'src/app/state/chuck-norris/service/chuck-norris-signal.service';

import
{
   ChangeDetectionStrategy,
   Component,
   EventEmitter,
   OnInit,
   Output,
   WritableSignal
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { chuckNorrisSignals } from 'src/app/state/chuck-norris/chuck-norris.signals';

@Component({
   selector: 'app-fact-categories',
   templateUrl: './fact-categories.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class FactCategoriesComponent implements OnInit
{
   options: WritableSignal<ReadonlyArray<FactCategory> | null> = chuckNorrisSignals().categories;
   @Output() categorySelected: EventEmitter<FactCategory> = new EventEmitter<FactCategory>();

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
      this._service.fetchCategories();
   }
}
