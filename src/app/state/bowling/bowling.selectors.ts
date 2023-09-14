import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BowlingState } from "../app.state";

// selectors
export const bowlingState = createFeatureSelector<Readonly<BowlingState>>('bowlingState');

export const getPlayers = createSelector(
  bowlingState,
  (state: BowlingState) => state.players
);

export const getGame = createSelector(
  bowlingState,
  (state: BowlingState) => state.game
);

export const getWinner = createSelector(
  bowlingState,
  (state: BowlingState) => state.game.winner
);

export const getScore = (name: string) => createSelector(
  bowlingState,
  (state: BowlingState) => state.game.bowlers.find(b => b.name === name)?.score
);