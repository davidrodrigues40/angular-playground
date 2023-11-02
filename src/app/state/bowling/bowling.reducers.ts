import { Action, createReducer, on } from '@ngrx/store';
import { BowlingState } from '../app.state';
import * as actions from './bowling.actions';

export const bowlingState: BowlingState = {
  players: [],
  game: undefined,
  ratings: []
};

const _bowlingReducer = createReducer(
  bowlingState,
  on(actions.BowlingActions.getPlayersSuccess, (_state, { payload }) => ({ ..._state, players: payload })),
  on(actions.BowlingActions.bowlSuccess, (_state, { payload }) => ({ ..._state, game: payload })),
  on(actions.BowlingActions.newGame, (_state) => ({ ..._state, game: undefined })),
  on(actions.BowlingActions.getRatingsSuccess, (_state, { payload }) => ({ ..._state, ratings: payload }))
);

export function bowlingReducer(state: any, action: Action) {
  return _bowlingReducer(state, action);
}