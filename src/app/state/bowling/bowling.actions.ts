import { createActionGroup, props } from '@ngrx/store';
import { BowlingGame } from './models/bowling-game.model';
import { Player } from './models/player.model';

export const BowlingActions = createActionGroup({
  source: 'BOwLING',
  events: {
    'Add Player': props<{ payload: string }>(),
    'Remove Player': props<{ payload: number }>(),
    'Update Players Success': props<{ payload: ReadonlyArray<Player> }>(),
    'Bowl': props<{ payload: ReadonlyArray<Player> }>(),
    'Bowl Success': props<{ payload: Readonly<BowlingGame> }>(),
  },
});