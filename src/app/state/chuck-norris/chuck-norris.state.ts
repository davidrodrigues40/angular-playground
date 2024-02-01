import { ChuckNorrisFact } from './models/chuck-norris-fact';
import { FactCategory } from './models/fact-category';

export interface ChuckNorrisFactState
{
    fact: Readonly<ChuckNorrisFact>;
    categories: ReadonlyArray<FactCategory>;
    selectedCategory?: Readonly<FactCategory>;
}
