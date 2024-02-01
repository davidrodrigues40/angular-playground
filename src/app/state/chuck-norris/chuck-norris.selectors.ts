import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ChuckNorrisFactState } from "./chuck-norris.state";

const getFactState = createFeatureSelector<ChuckNorrisFactState>('chuckNorrisFactState');

export const getFact = createSelector(
    getFactState,
    (state: ChuckNorrisFactState) => state.fact
);

export const getCategories = createSelector(
    getFactState,
    (state: ChuckNorrisFactState) => state.categories
);

export const getSelectedCategory = createSelector(
    getFactState,
    (state: ChuckNorrisFactState) => state.selectedCategory
)