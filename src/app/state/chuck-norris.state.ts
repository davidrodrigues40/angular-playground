import { FactCategory } from 'src/app/interfaces/models/chuck-norris/fact-category';

import { signal, WritableSignal } from '@angular/core';

import { ChuckNorrisFact } from '../interfaces/models/chuck-norris/chuck-norris-fact';

export class ChuckNorrisFactState {
   static readonly fact: WritableSignal<Readonly<ChuckNorrisFact | null>> = signal<Readonly<ChuckNorrisFact> | null>(null);
   static readonly categories: WritableSignal<ReadonlyArray<FactCategory>> = signal<ReadonlyArray<FactCategory>>([]);
   static readonly selectedCategory: WritableSignal<Readonly<FactCategory | null>> = signal<Readonly<FactCategory> | null>(null);
   static readonly footerFact: WritableSignal<Readonly<ChuckNorrisFact | null>> = signal<Readonly<ChuckNorrisFact> | null>(null);
   static readonly favoriteFacts: WritableSignal<ReadonlyArray<ChuckNorrisFact>> = signal<ReadonlyArray<ChuckNorrisFact>>([]);
}
