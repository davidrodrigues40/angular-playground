import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MenuState } from "./menu.state";

const getMenuState = createFeatureSelector<MenuState>('menuState');

export const getMenu = createSelector(
    getMenuState,
    (state: MenuState) => state.items
);