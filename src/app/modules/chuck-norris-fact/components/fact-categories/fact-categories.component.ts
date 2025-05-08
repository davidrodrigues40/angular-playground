import { FactCategory } from 'src/app/modules/chuck-norris-fact/models/fact-category';

import {
   ChangeDetectionStrategy,
   Component,
   EventEmitter,
   inject,
   OnInit,
   Output,
   WritableSignal
} from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ChuckNorrisFactsService } from 'src/app/modules/chuck-norris-fact/services/chuck-norris-facts.service';
import { ChuckNorrisFactState } from 'src/app/modules/chuck-norris-fact/chuck-norris.state';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
   selector: 'app-fact-categories',
   templateUrl: './fact-categories.component.html',
   standalone: true,
   imports: [
      MatFormFieldModule,
      MatSelectModule
   ],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class FactCategoriesComponent implements OnInit {
   @Output() categorySelected: EventEmitter<FactCategory> = new EventEmitter<FactCategory>();

   protected options: WritableSignal<ReadonlyArray<FactCategory> | null> = ChuckNorrisFactState.categories;
   private readonly _service = inject(ChuckNorrisFactsService);

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
