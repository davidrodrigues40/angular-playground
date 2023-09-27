import { Bowler } from "./bowler.model";
import { Scorecard } from "./scorecard.model";

export interface BowlingGame {
  bowlers: Bowler[];
  winner: Scorecard;
}