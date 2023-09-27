import { Frame } from "./frame.model";
import { Player } from "./player.model";

export interface Bowler extends Player {
    frames: Map<number, Frame>;
    score: number;
}
