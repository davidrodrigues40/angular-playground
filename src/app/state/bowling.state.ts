import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { Game } from '../interfaces/models/bowling/game';
import { Player } from '../interfaces/models/bowling/player';
import { signal, WritableSignal } from '@angular/core';

export interface BowlingStateOld {
   players: ReadonlyArray<Player>;
   game?: Readonly<Game>;
   ratings: ReadonlyArray<BowlerRating>;
   status: 'offline' | 'online';
}

export class BowlingState {
   static readonly players: WritableSignal<ReadonlyArray<Player>> = signal<ReadonlyArray<Player>>([] as ReadonlyArray<Player>);
   static readonly game: WritableSignal<Readonly<Game>> = signal<Readonly<Game>>({} as Readonly<Game>);
   static readonly ratings: WritableSignal<ReadonlyArray<BowlerRating>> = signal<ReadonlyArray<BowlerRating>>([] as ReadonlyArray<BowlerRating>);
   static readonly status: WritableSignal<'offline' | 'online'> = signal<'offline' | 'online'>('offline' as 'offline' | 'online');
}