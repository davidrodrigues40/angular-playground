import { Player } from "src/app/interfaces/models/bowling/player";
import { BowlingState } from "src/app/state/bowling.state";

export abstract class BowlingServiceAbstract {
    abstract bowl(players: ReadonlyArray<Player>): void;
    abstract getRatings(): void;
    getScore(playerName: string): number {
        const player = BowlingState.game().bowlers.find(p => p.name === playerName);
        if (!player) return 0;

        return player.score;
    }
}