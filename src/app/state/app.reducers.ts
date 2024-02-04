import { ActionReducerMap } from '@ngrx/store';

import { AppState } from './app.state';
import * as bowlingReducers from './bowling/bowling.reducers';

export const reducers: ActionReducerMap<AppState> = {
   bowlingState: bowlingReducers.bowlingReducer
}