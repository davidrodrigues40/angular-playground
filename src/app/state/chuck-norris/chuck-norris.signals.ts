import { signal } from '@angular/core';

import { ChuckNorrisFactState } from './chuck-norris.state';
import { ChuckNorrisFact } from './models/chuck-norris-fact';
import { FactCategory } from './models/fact-category';

export function chuckNorrisSignals()
{
   return _chuckNorrisSignals;
}

const _chuckNorrisSignals: ChuckNorrisFactState =
{
   fact: signal<Readonly<ChuckNorrisFact> | null>(null),
   categories: signal<ReadonlyArray<FactCategory> | null>(null),
   selectedCategory: signal<Readonly<FactCategory> | null>(null)
}