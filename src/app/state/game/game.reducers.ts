import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { GameState } from '../app.state';
import { GameActions } from './game.actions';

export const gameState: GameState = {
  game: {
    home: 0,
    away: 0
  }
};

const _gameReducer = createReducer(
  gameState,
  on(GameActions.getScoreSuccess, (_state, { payload }) => ({ game: payload })),
  // on(ScoreActions.addRunsToHomeSuccess, (_state, { payload }) => {
  //   console.log('state', _state);
  //   return { ..._state, home: _state.home + payload }
  // })
);

export function gameReducer(state: any, action: Action) {
  return _gameReducer(state, action);
}

