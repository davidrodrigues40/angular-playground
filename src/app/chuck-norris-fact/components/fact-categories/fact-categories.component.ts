import { Component, Input } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { CategoriesState } from 'src/app/state/app.state';
import * as actions from 'src/app/state/chuck-norris/chuck-norris.actions';
import { FactCategory } from 'src/app/state/chuck-norris/models/fact-category';

@Component({
  selector: 'app-fact-categories',
  templateUrl: './fact-categories.component.html'
})
export class FactCategoriesComponent {
  @Input() options: ReadonlyArray<FactCategory> = [];

  constructor(private readonly _store: Store<CategoriesState>) { }

  selected: string = 'random';

  selectionChange(event: MatSelectChange): void {
    this._store.dispatch(actions.categoryActions.categorySelected({ payload: { category: event.value } }));
  }
}
