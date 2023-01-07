import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CategoriesState, ChuckNorrisFactState, SelectedCategoryState } from "../app.state";

export const getFactState = createFeatureSelector<ChuckNorrisFactState>('chuckNorrisFactState');
export const getCategoriesState = createFeatureSelector<CategoriesState>('categoriesState');
export const getSelectedCategoryState = createFeatureSelector<SelectedCategoryState>('selectedCategoryState');

export const getFact = createSelector(
  getFactState,
  (state: ChuckNorrisFactState) => state.fact
);

export const getCategories = createSelector(
  getCategoriesState,
  (state: CategoriesState) => state.categories
);

export const getSelectedCategory = createSelector(
  getSelectedCategoryState,
  (state: SelectedCategoryState) => state.value
)