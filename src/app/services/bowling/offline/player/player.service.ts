import { Bowler } from 'src/app/interfaces/models/bowling/bowler';
import { Frame } from 'src/app/interfaces/models/bowling/frame';
import { Player } from 'src/app/interfaces/models/bowling/player';

import { Injectable } from '@angular/core';

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
