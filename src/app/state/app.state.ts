import { BooksState, CollectionState } from './books/books.state';
import { BowlingState } from './bowling/bowling.state';
import { ChuckNorrisFactState } from './chuck-norris/chuck-norris.state';
import { MenuState } from './menu/menu.state';

export interface AppState
{
   booksState: BooksState;
   collectionState: CollectionState;
   chuckNorrisFactState: ChuckNorrisFactState;
   menuState: MenuState;
   bowlingState: BowlingState;
}



