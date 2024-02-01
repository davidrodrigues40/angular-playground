import { BowlerRating } from "src/app/modules/bowling/models/bowler-rating.model";
import { BowlingGame } from "./models/bowling-game.model";
import { Player } from "./models/player.model";

export interface BowlingState
{
    players: ReadonlyArray<Player>;
    game?: Readonly<BowlingGame>;
    ratings: ReadonlyArray<BowlerRating>;
}