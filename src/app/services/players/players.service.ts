import { Player } from 'src/app/interfaces/models/bowling/player';

import { Injectable } from '@angular/core';

import { BowlingState } from 'src/app/state/bowling.state';
import { Game } from 'src/app/interfaces/models/bowling/game';

@Injectable()
export class PlayersService {
   private readonly _sessionKey = 'players';

   addPlayer(name: string, rating: number): void {
      const players = BowlingState.players();
      const nextNumber = players.length + 1;
      const playerList = [...players, { number: nextNumber, name, rating }];

      BowlingState.players.set(playerList);
   }

   removePlayer(playerNumber: number): void {
      const players = BowlingState.players();
      let newList: Player[] = [];
      newList = players.filter(player => player.number !== playerNumber);
      newList.forEach((player, index) => player.number = index + 1);

      BowlingState.players.set(newList);
   }

   removeAllPlayers(): void {
      BowlingState.players.set([]);
   }
   changePlayerRatings(rating: number, players: ReadonlyArray<Player>): void {
      const newPlayers: Player[] = [];
      const game: Game = BowlingState.game();
      players.forEach(player => {
         newPlayers.push({ ...player, rating });
      });

      BowlingState.players.set(newPlayers);
      BowlingState.game.set({ ...BowlingState.game(), bowlers: game.bowlers, winner: undefined, completed: false });
   }
}