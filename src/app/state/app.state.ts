import { BooksState, CollectionState } from './books/books.state';
import { BowlingState } from './bowling/bowling.state';
import { ChuckNorrisFactState } from './chuck-norris/chuck-norris.state';

export interface AppState
{
   booksState: BooksState;
   collectionState: CollectionState;
   bowlingState: BowlingState;
}



