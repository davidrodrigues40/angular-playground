import { StorageTranscoders } from 'ngx-webstorage-service';
import { Observable, of } from 'rxjs';
import { Player } from 'src/app/interfaces/models/bowling/player';

import { Injectable } from '@angular/core';

import { CacheService } from '../cache/cache.service';

@Injectable()
export class PlayersService
{
   private readonly _sessionKey = 'players';

   constructor(private readonly _cacheService: CacheService) { }

   getPlayers$(): Observable<ReadonlyArray<Player>>
   {
      const players = this._cacheService.getSession(this._sessionKey, StorageTranscoders.JSON);

      return of(players || []);
   }

   addPlayer$(name: string, rating: number, players: ReadonlyArray<Player>): Observable<ReadonlyArray<Player>>
   {
      const nextNumber = players.length + 1;
      const playerList = [...players, { number: nextNumber, name, rating }];

      this._cacheService.setSession(this._sessionKey, playerList, StorageTranscoders.JSON);

      return of(playerList);
   }

   removePlayer$(playerNumber: number, players: ReadonlyArray<Player>): Observable<ReadonlyArray<Player>>
   {
      let newList: Player[] = [];
      newList = players.filter(player => player.number !== playerNumber);

      newList.forEach((player, index) => player.number = index + 1);

      this._cacheService.setSession(this._sessionKey, newList, StorageTranscoders.JSON);

      return of(newList);
   }

   removeAllPlayers$(): Observable<ReadonlyArray<Player>>
   {
      this._cacheService.setSession(this._sessionKey, [], StorageTranscoders.JSON);

      return of([]);
   }

   changePlayerRatings$(rating: number, players: ReadonlyArray<Player>): Observable<ReadonlyArray<Player>>
   {
      const newPlayers: Player[] = [];
      players.forEach(player =>
      {
         newPlayers.push({ ...player, rating });
      });

      this._cacheService.setSession(this._sessionKey, newPlayers, StorageTranscoders.JSON);

      return of(newPlayers);
   }
}