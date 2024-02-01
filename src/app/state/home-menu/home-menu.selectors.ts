import { createFeatureSelector, createSelector } from '@ngrx/store';

import { HomeMenuState } from './home-menu.state';

const getHomeMenuState = createFeatureSelector<HomeMenuState>('homeMenuState');

export const getMenu = createSelector(
    getHomeMenuState,
    (state: HomeMenuState) => state.items
);