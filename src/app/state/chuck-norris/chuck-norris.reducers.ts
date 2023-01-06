import { Action, createReducer, on } from '@ngrx/store';
import { CategoriesState, ChuckNorrisFactState } from "../app.state";
import * as actions from './chuck-norris.actions';

export const factState: ChuckNorrisFactState = {
  fact: {
    icon_url: "",
    id: "",
    url: "",
    value: ""
  }
};

export const catetoriesState: CategoriesState = {
  categories: []
}

const _factReducer = createReducer(
  factState,
  on(actions.factActions.getFactSuccess, (_state, { payload }) => { return { fact: payload }; })
);

const _categoriesReducer = createReducer(
  catetoriesState,
  on(actions.catetoryActions.getAllSuccess, (_state, { payload }) => { return { categories: payload }; })
)

export function factReducer(state: any, action: Action) {
  return _factReducer(state, action);
};

export function categoryReducer(state: any, action: Action) {
  return _categoriesReducer(state, action);
}