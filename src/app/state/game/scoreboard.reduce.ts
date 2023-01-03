import { createFeature, createReducer, on } from '@ngrx/store';
import { Game } from './game.model';
import { ScoreActions } from './scoreboard.actions';

export const scoreboardFeatureKey = 'game';

export const initialState: Game = {
  home: 0,
  away: 0,
};

export const scoreboardReducer = createReducer(
  initialState,
  on(ScoreActions.homeScore, (state, { runs }) => ({ ...state, home: state.home + runs })),
  on(ScoreActions.awayScore, (state, { runs }) => ({ ...state, away: state.away + runs })),
  on(ScoreActions.resetScore, state => ({ home: 0, away: 0 })),
  on(ScoreActions.setScores, (state, { game }) => ({ home: game.home, away: game.away }))
);

export const scoreboardFeature = createFeature({
  name: scoreboardFeatureKey,
  reducer: scoreboardReducer
});