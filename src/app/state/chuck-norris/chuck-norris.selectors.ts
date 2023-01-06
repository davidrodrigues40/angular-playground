import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CategoriesState, ChuckNorrisFactState } from "../app.state";

export const getFactState = createFeatureSelector<ChuckNorrisFactState>('chuckNorrisFactState');
export const getCategoriesState = createFeatureSelector<CategoriesState>('categoriesState');

export const getFact = createSelector(
  getFactState,
  (state: ChuckNorrisFactState) => state.fact
);

export const getCategories = createSelector(
  getCategoriesState,
  (state: CategoriesState) => state.categories
)