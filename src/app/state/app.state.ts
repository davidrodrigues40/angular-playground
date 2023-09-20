import { BowlerRating } from '../modules/bowling/models/bowler-rating.model';
import { Book } from './books/models/books.model';
import { BowlingGame } from './bowling/models/bowling-game.model';
import { Player } from './bowling/models/player.model';
import { ChuckNorrisFact } from './chuck-norris/models/chuck-norris-fact';
import { FactCategory } from './chuck-norris/models/fact-category';
import { Game } from './game/game.model';
import { MenuItem } from './menu/models/menu-item';

export interface AppState {
  booksState: BooksState;
  collectionState: CollectionState;
  gameState: GameState;
  chuckNorrisFactState: ChuckNorrisFactState;
  categoriesState: CategoriesState;
  menuState: MenuState;
  selectedCategoryState: SelectedCategoryState;
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

export interface GameState {
  game: Readonly<Game>
}

export interface ChuckNorrisFactState {
  fact: Readonly<ChuckNorrisFact>
}

export interface CategoriesState {
  categories: ReadonlyArray<FactCategory>
}

export interface MenuState {
  items: ReadonlyArray<MenuItem>
}

export interface SelectedCategoryState {
  value: Readonly<FactCategory>
}

export interface BowlingState {
  players: ReadonlyArray<Player>;
  game?: Readonly<BowlingGame>;
  ratings: ReadonlyArray<BowlerRating>;
}