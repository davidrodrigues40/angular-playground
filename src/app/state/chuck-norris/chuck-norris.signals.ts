import { FactCategory } from 'src/app/interfaces/models/chuck-norris/fact-category';

import { signal } from '@angular/core';

import { ChuckNorrisFact } from '../../interfaces/models/chuck-norris/chuck-norris-fact';
import { ChuckNorrisFactState } from './chuck-norris.state';

export function chuckNorrisSignals()
{
   return _chuckNorrisSignals;
}

const _chuckNorrisSignals: ChuckNorrisFactState =
{
   fact: signal<Readonly<ChuckNorrisFact> | null>(null),
   categories: signal<ReadonlyArray<FactCategory> | null>(null),
   selectedCategory: signal<Readonly<FactCategory> | null>(null),
   footerFact: signal<Readonly<ChuckNorrisFact> | null>(null)
}