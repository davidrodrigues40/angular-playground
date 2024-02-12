import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { Game } from '../../interfaces/models/bowling/game';
import { Player } from '../../interfaces/models/bowling/player';

export interface BowlingState
{
   players: ReadonlyArray<Player>;
   game?: Readonly<Game>;
   ratings: ReadonlyArray<BowlerRating>;
   status: 'offline' | 'online';
}