import { ActionReducerMap } from '@ngrx/store';

import { AppState } from './app.state';
import * as bookReducers from './books/books.reducer';
import * as bowlingReducers from './bowling/bowling.reducers';

export const reducers: ActionReducerMap<AppState> = {
   booksState: bookReducers.booksReducer,
   collectionState: bookReducers.collectionReducer,
   bowlingState: bowlingReducers.bowlingReducer
}