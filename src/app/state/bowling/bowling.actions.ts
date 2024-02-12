import { BowlingHttpResponse } from 'src/app/interfaces/models/bowling/bowling-http-response';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Game } from '../../interfaces/models/bowling/game';
import { Player } from '../../interfaces/models/bowling/player';

export const BowlingActions = createActionGroup({
   source: 'BOWLING',
   events: {
      'Set Status': props<{ payload: 'offline' | 'online' }>(),
      'Get Players': emptyProps(),
      'Get Players Success': props<{ payload: ReadonlyArray<Player> }>(),
      'Add Player': props<{ payload: { name: string, rating: number, players: ReadonlyArray<Player> } }>(),
      'Remove Player': props<{ payload: { id: number, players: ReadonlyArray<Player> } }>(),
      'Bowl': props<{ payload: ReadonlyArray<Player> }>(),
      'Bowl Success': props<{ payload: BowlingHttpResponse<Game> }>(),
      'Get Ratings': emptyProps(),
      'Get Ratings Success': props<{ payload: BowlingHttpResponse<Array<BowlerRating>> }>(),
      'New Game': emptyProps(),
      'Change All Players Ratings': props<{ payload: { rating: number, players: ReadonlyArray<Player> } }>()
   },
});