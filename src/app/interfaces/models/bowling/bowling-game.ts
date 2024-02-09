import { Bowler } from './bowler';
import { Scorecard } from './scorecard';

export interface BowlingGame
{
   bowlers: Bowler[];
   winner: Scorecard;
}