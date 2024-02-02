import { ActionReducerMap } from '@ngrx/store';

import { AppState } from './app.state';
import * as bookReducers from './books/books.reducer';
import * as bowlingReducers from './bowling/bowling.reducers';
import * as factReducers from './chuck-norris/chuck-norris.reducers';
import * as homeMenuReducers from './home-menu/home-menu.reducers';
import * as menuReducers from './menu/menu.reducers';

export const reducers: ActionReducerMap<AppState> = {
   booksState: bookReducers.booksReducer,
   collectionState: bookReducers.collectionReducer,
   chuckNorrisFactState: factReducers.factReducer,
   menuState: menuReducers.menuReducer,
   bowlingState: bowlingReducers.bowlingReducer,
   homeMenuState: homeMenuReducers.homeMenuReducer
}