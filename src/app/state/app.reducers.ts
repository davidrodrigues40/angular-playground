import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import * as bookReducers from './books/books.reducer';
import * as bowlingReducers from "./bowling/bowling.reducers";
import * as factReducers from './chuck-norris/chuck-norris.reducers';
import * as gameReducers from './game/game.reducers';
import * as menuReducers from './menu/menu.reducers';

export const reducers: ActionReducerMap<AppState> = {
  booksState: bookReducers.booksReducer,
  collectionState: bookReducers.collectionReducer,
  gameState: gameReducers.gameReducer,
  chuckNorrisFactState: factReducers.factReducer,
  categoriesState: factReducers.categoryReducer,
  menuState: menuReducers.menuReducer,
  selectedCategoryState: factReducers.selectedCategoryReducer,
  bowlingState: bowlingReducers.bowlingReducer
}