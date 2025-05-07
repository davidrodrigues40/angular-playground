import { Observable } from 'rxjs';
import { Game } from 'src/app/interfaces/models/bowling/game';
import { Player } from 'src/app/interfaces/models/bowling/player';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';
import { BowlingState } from 'src/app/state/bowling.state';

export interface IBowlingService {
   bowl$(players: ReadonlyArray<Player>): Observable<Game>
   getRatings$(): Observable<BowlerRating[]>
}

export abstract class BowlingService {
   protected updateGame(game: Game): void {
      BowlingState.game.set(game);
   }

   protected updatePlayers(players: ReadonlyArray<Player>): void {
      BowlingState.players.set(players);
   }
   protected updateRatings(ratings: ReadonlyArray<BowlerRating>): void {
      BowlingState.ratings.set(ratings);
   }
}