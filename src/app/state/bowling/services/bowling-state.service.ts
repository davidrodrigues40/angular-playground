import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, first, map } from 'rxjs';
import { BowlingState } from '../../app.state';
import * as selectors from '../bowling.selectors';
import { Player } from '../models/player.model';

@Injectable()
export class BowlingStateService {

  constructor(private readonly _store: Store<BowlingState>) { }

  addPlayer$(name: string, rating: number): Observable<ReadonlyArray<Player>> {
    return this._store.select(selectors.getPlayers)
      .pipe(
        first(),
        map(players => {
          const nextNumber = players.length + 1;

          return [...players, { number: nextNumber, name, rating }];
        }),
      );
  }

  removePlayer$(playerNumber: number): Observable<ReadonlyArray<Player>> {
    return this._store.select(selectors.getPlayers)
      .pipe(
        first(),
        map(players => {
          let newList: Player[] = [];
          players.filter(player => player.number !== playerNumber).forEach((player, index) => newList.push({ number: index + 1, name: player.name, rating: player.rating }));

          return newList;
        }),
      );
  }
}
