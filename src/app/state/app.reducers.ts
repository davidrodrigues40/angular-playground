import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import * as bookReducers from './books/books.reducer';

export const reducers: ActionReducerMap<AppState> = {
  booksState: bookReducers.booksReducer
}