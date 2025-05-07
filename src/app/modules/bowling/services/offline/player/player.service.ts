import { Injectable } from '@angular/core';
import { Bowler } from '../../../models/bowler';
import { Frame } from '../../../models/frame';
import { Player } from '../../../models/player';

@Injectable()
export class PlayerService {
   generateBowlers(players: ReadonlyArray<Player>): Bowler[] {
      return players.map((player, index) => {
         const bowler: Bowler = {
            number: index,
            name: player.name,
            rating: player.rating,
            frames: new Map<number, Frame>(),
            score: 0
         };

         return bowler;
      });
   }
}
