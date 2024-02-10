import { Observable } from 'rxjs';
import { Game } from 'src/app/interfaces/models/bowling/game';
import { Player } from 'src/app/interfaces/models/bowling/player';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

export interface IBowlingService
{
   bowl$(players: ReadonlyArray<Player>): Observable<Game>
   getRatings$(): Observable<BowlerRating[]>
}