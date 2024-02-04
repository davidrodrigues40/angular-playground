import { WritableSignal } from '@angular/core';

import { ChuckNorrisFact } from './models/chuck-norris-fact';
import { FactCategory } from './models/fact-category';

export interface ChuckNorrisFactState
{
   fact: WritableSignal<Readonly<ChuckNorrisFact> | null>;
   categories: WritableSignal<ReadonlyArray<FactCategory> | null>;
   selectedCategory: WritableSignal<Readonly<FactCategory> | null>;
}
