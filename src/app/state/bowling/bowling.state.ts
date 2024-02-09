import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { BowlingGame } from '../../interfaces/models/bowling/bowling-game';
import { Player } from '../../interfaces/models/bowling/player';

export interface BowlingState
{
   players: ReadonlyArray<Player>;
   game?: Readonly<BowlingGame>;
   ratings: ReadonlyArray<BowlerRating>;
}