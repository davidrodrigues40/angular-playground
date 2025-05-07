import { BowlingState } from "../bowling.state";
import { Player } from "../models/player";

export abstract class BowlingServiceAbstract {
    abstract bowl(players: ReadonlyArray<Player>): void;
    abstract getRatings(): void;
    getScore(playerName: string): number {
        const player = BowlingState.game().bowlers.find(p => p.name === playerName);
        if (!player) return 0;

        return player.score;
    }
}