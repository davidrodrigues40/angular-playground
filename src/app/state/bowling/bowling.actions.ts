import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';
import { BowlingGame } from './models/bowling-game.model';
import { Player } from './models/player.model';

export const BowlingActions = createActionGroup({
  source: 'BOwLING',
  events: {
    'Add Player': props<{ payload: { name: string, rating: number } }>(),
    'Remove Player': props<{ payload: number }>(),
    'Update Players Success': props<{ payload: ReadonlyArray<Player> }>(),
    'Bowl': props<{ payload: ReadonlyArray<Player> }>(),
    'Bowl Success': props<{ payload: Readonly<BowlingGame> }>(),
    'Get Ratings': emptyProps(),
    'Get Ratings Success': props<{ payload: ReadonlyArray<BowlerRating> }>(),
    'New Game': emptyProps(),
  },
});