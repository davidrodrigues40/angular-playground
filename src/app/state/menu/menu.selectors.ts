import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MenuState } from "../app.state";

export const getMenuState = createFeatureSelector<MenuState>('menuState');

export const getMenu = createSelector(
  getMenuState,
  (state: MenuState) => state.items
);