import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChuckNorrisFactState, SelectedCategoryState } from 'src/app/state/app.state';
import * as selectors from 'src/app/state/chuck-norris/chuck-norris.selectors';
import * as actions from 'src/app/state/chuck-norris/chuck-norris.actions';
import { ChuckNorrisFact } from 'src/app/state/chuck-norris/models/chuck-norris-fact';
import { first, map, Observable } from 'rxjs';
import { FactCategory } from 'src/app/state/chuck-norris/models/fact-category';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-fact-generator',
  templateUrl: './fact-generator.component.html',
  styleUrls: ['./fact-generator.component.scss']
})
export class FactGeneratorComponent implements OnInit {
  public fact$: Observable<ChuckNorrisFact> = this._store.select(selectors.getFact);
  public categories$: Observable<ReadonlyArray<FactCategory>> = this._store.select(selectors.getCategories);

  constructor(private readonly _store: Store<ChuckNorrisFactState>, private readonly _categoryStore: Store<SelectedCategoryState>) { }

  ngOnInit(): void {
    this._store.dispatch(actions.categoryActions.getAll());
  }

  getFact(): void {
    this._store.dispatch(actions.factActions.getFact());
  }

  getFactForCategory(): void {
    this._categoryStore.select(selectors.getSelectedCategory)
      .pipe(
        first(),
        map(action => action))
      .subscribe(category => this._store.dispatch(actions.factActions.getFactForCategory({ payload: category })));
  }
}
