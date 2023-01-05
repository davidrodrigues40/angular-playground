import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import * as bookReducers from './books/books.reducer';
import * as gameReducers from './game/game.reducers'

export const reducers: ActionReducerMap<AppState> = {
  booksState: bookReducers.booksReducer,
  collectionState: bookReducers.collectionReducer,
  gameState: gameReducers.gameReducer
}