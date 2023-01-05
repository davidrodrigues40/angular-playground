import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GameState } from "../app.state";

// selectors
export const gameScore = createFeatureSelector<Readonly<GameState>>('gameState');

export const getHomeScore = createSelector(
  gameScore,
  (state: GameState) => state.game.home
);

export const getAwayScore = createSelector(
  gameScore,
  (state: GameState) => state.game.away
);

export const getScore = createSelector(
  gameScore,
  (state: GameState) => state.game
);