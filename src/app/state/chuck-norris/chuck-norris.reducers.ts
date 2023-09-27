import { Action, createReducer, on } from '@ngrx/store';
import { ChuckNorrisFactState } from "../app.state";
import * as actions from './chuck-norris.actions';

export const factState: ChuckNorrisFactState = {
  fact: {
    icon_url: "",
    id: "",
    url: "",
    value: ""
  },
  categories: [],
  selectedCategory: undefined
};

const _factReducer = createReducer(
  factState,
  on(actions.factActions.getFactSuccess, (_state, { payload }) => ({ ..._state, fact: payload })),
  on(actions.categoryActions.getAllSuccess, (_state, { payload }) => ({ ..._state, categories: payload })),
  on(actions.categoryActions.catetorySelectedSuccess, (_state, { payload }) => ({ ..._state, selectedCategory: payload }))
);

export function factReducer(state: any, action: Action) {
  return _factReducer(state, action);
};