import { createReducer, on, Action } from "@ngrx/store";
import { MenuState } from "../app.state";
import * as actions from './menu.actions';

export const menuState: MenuState = {
  items: []
}

const _menuReducer = createReducer(
  menuState,
  on(actions.menuActions.getAllSuccess, (_state, { payload }) => { return { items: payload }; })
);

export function menuReducer(store: any, action: Action) {
  return _menuReducer(store, action);
}