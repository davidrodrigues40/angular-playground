import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Game } from './game.model';

export const GameActions = createActionGroup({
  source: '[GAME]',
  events: {
    'Home Score': props<{ runs: number }>(),
    'Away Score': props<{ runs: number }>(),
    'Reset Score': props<null>(),
    'Set Scores': props<{ game: Game }>(),
    'Get Score': emptyProps(),
    'Get Score Success': props<{ payload: Readonly<Game> }>()
  },
});