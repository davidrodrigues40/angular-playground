import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { BowlingGame } from '../../interfaces/models/bowling/bowling-game';
import { Player } from '../../interfaces/models/bowling/player';

export const BowlingActions = createActionGroup({
   source: 'BOwLING',
   events: {
      'Get Players': emptyProps(),
      'Get Players Success': props<{ payload: ReadonlyArray<Player> }>(),
      'Add Player': props<{ payload: { name: string, rating: number, players: ReadonlyArray<Player> } }>(),
      'Remove Player': props<{ payload: { id: number, players: ReadonlyArray<Player> } }>(),
      'Bowl': props<{ payload: ReadonlyArray<Player> }>(),
      'Bowl Success': props<{ payload: Readonly<BowlingGame> }>(),
      'Get Ratings': emptyProps(),
      'Get Ratings Success': props<{ payload: ReadonlyArray<BowlerRating> }>(),
      'New Game': emptyProps(),
      'Change All Players Ratings': props<{ payload: { rating: number, players: ReadonlyArray<Player> } }>()
   },
});