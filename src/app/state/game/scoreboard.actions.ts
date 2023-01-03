import { createActionGroup, props } from '@ngrx/store';
import { Game } from './game.model';

export const ScoreActions = createActionGroup({
  source: 'Game',
  events: {
    'Home Score': props<{ runs: number }>(),
    'Away Score': props<{ runs: number }>(),
    'Reset Score': props<null>(),
    'Set Scores': props<{ game: Game }>()
  },
});