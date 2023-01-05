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
  on(GameActions.addRunsToHomeSuccess, (_state, { payload }) => {
    return { ..._state, game: { home: _state.game.home + payload, away: _state.game.away } }
  }),
  on(GameActions.addRunsToAwaySuccess, (_state, { payload }) => {
    return { ..._state, game: { home: _state.game.home, away: _state.game.away + payload } }
  }),
  on(GameActions.resetScoreSuccess, (_state) => {
    return { ..._state, game: { home: 0, away: 0 } };
  }),
  on(GameActions.setScoresSuccess, (_state, { payload }) => {
    return { ..._state, game: payload };
  })
);

export function gameReducer(state: any, action: Action) {
  return _gameReducer(state, action);
}

