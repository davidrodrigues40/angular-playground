import { Book } from './books/books.model';
import { Game } from './game/game.model';

export interface AppState {
  booksState: BooksState;
  collectionState: CollectionState;
  gameState: GameState;
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