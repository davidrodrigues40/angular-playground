import { ActionReducerMap } from '@ngrx/store';

import { AppState } from './app.state';
import * as bookReducers from './books/books.reducer';
import * as bowlingReducers from './bowling/bowling.reducers';
import * as factReducers from './chuck-norris/chuck-norris.reducers';

export const reducers: ActionReducerMap<AppState> = {
   booksState: bookReducers.booksReducer,
   collectionState: bookReducers.collectionReducer,
   chuckNorrisFactState: factReducers.factReducer,
   bowlingState: bowlingReducers.bowlingReducer
}