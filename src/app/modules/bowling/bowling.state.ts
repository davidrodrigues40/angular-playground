import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { signal, WritableSignal } from '@angular/core';
import { Game } from './models/game';
import { Player } from './models/player';

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