import { Action, createReducer, on } from '@ngrx/store';
import { CategoriesState, ChuckNorrisFactState, SelectedCategoryState } from "../app.state";
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
};

export const selectedCategoryState: SelectedCategoryState = {
  value: {
    category: ''
  }
}

const _factReducer = createReducer(
  factState,
  on(actions.factActions.getFactSuccess, (_state, { payload }) => { return { fact: payload }; })
);

const _categoriesReducer = createReducer(
  catetoriesState,
  on(actions.categoryActions.getAllSuccess, (_state, { payload }) => { return { categories: payload }; })
);

const _selectedCategoryReducer = createReducer(
  selectedCategoryState,
  on(actions.categoryActions.catetorySelectedSuccess, (_state, { payload }) => { console.log('pl', payload); return { value: payload }; })
);

export function factReducer(state: any, action: Action) {
  return _factReducer(state, action);
};

export function categoryReducer(state: any, action: Action) {
  return _categoriesReducer(state, action);
};

export function selectedCategoryReducer(state: any, action: Action) {
  return _selectedCategoryReducer(state, action);
}