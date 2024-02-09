import { FactCategory } from 'src/app/interfaces/models/chuck-norris/fact-category';

import { WritableSignal } from '@angular/core';

import { ChuckNorrisFact } from '../../interfaces/models/chuck-norris/chuck-norris-fact';

export interface ChuckNorrisFactState
{
   fact: WritableSignal<Readonly<ChuckNorrisFact> | null>;
   categories: WritableSignal<ReadonlyArray<FactCategory> | null>;
   selectedCategory: WritableSignal<Readonly<FactCategory> | null>;
   footerFact: WritableSignal<Readonly<ChuckNorrisFact> | null>;
}
