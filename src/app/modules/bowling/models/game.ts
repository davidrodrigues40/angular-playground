import { Bowler } from './bowler';
import { Scorecard } from './scorecard';

export interface Game {
   bowlers: Bowler[];
   winner?: Scorecard;
   completed: boolean;
}