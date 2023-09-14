import { Action, createReducer, on } from '@ngrx/store';
import { BowlingState } from '../app.state';
import * as actions from './bowling.actions';

export const bowlingState: BowlingState = {
  players: [],
  game: {
    bowlers: [],
    winner: {
      name: '',
      score: 0
    }
  }
};

const _bowlingReducer = createReducer(
  bowlingState,
  on(actions.BowlingActions.updatePlayersSuccess, (_state, { payload }) => ({ ..._state, players: payload })),
  on(actions.BowlingActions.bowlSuccess, (_state, { payload }) => ({ ..._state, game: payload })),
  on(actions.BowlingActions.newGame, (_state) => ({ ..._state, players: [], game: { bowlers: [], winner: { name: '', score: 0 } } })),
);

export function bowlingReducer(state: any, action: Action) {
  return _bowlingReducer(state, action);
}