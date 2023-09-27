import { BowlerRating } from '../modules/bowling/models/bowler-rating.model';
import { Book } from './books/models/books.model';
import { BowlingGame } from './bowling/models/bowling-game.model';
import { Player } from './bowling/models/player.model';
import { ChuckNorrisFact } from './chuck-norris/models/chuck-norris-fact';
import { FactCategory } from './chuck-norris/models/fact-category';
import { MenuItem } from './menu/models/menu-item';

export interface AppState {
  booksState: BooksState;
  collectionState: CollectionState;
  chuckNorrisFactState: ChuckNorrisFactState;
  menuState: MenuState;
  bowlingState: BowlingState;
}

export interface BooksState {
  books: ReadonlyArray<Book>;
  message: any;
}

export interface CollectionState {
  books: ReadonlyArray<Book>;
  message: any;
}

export interface ChuckNorrisFactState {
  fact: Readonly<ChuckNorrisFact>;
  categories: ReadonlyArray<FactCategory>;
  selectedCategory?: Readonly<FactCategory>;
}

export interface MenuState {
  items: ReadonlyArray<MenuItem>
}
export interface BowlingState {
  players: ReadonlyArray<Player>;
  game?: Readonly<BowlingGame>;
  ratings: ReadonlyArray<BowlerRating>;
}