import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Game } from './game.model';

export const GameActions = createActionGroup({
  source: 'GAME',
  events: {
    'Reset Score': emptyProps(),
    'Reset Score Success': emptyProps(),
    'Set Scores': props<{ payload: Game }>(),
    'Set Scores Success': props<{ payload: Game }>(),
    'Get Score': emptyProps(),
    'Get Score Success': props<{ payload: Readonly<Game> }>(),
    'Add Runs To Home': props<{ payload: number }>(),
    'Add Runs To Home Success': props<{ payload: number }>(),
    'Add Runs To Away': props<{ payload: number }>(),
    'Add Runs To Away Success': props<{ payload: number }>()
  },
});