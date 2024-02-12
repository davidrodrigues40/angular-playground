import { Action, createReducer, on } from '@ngrx/store';

import * as actions from './bowling.actions';
import { BowlingState } from './bowling.state';

const bowlingState: BowlingState = {
   players: [],
   game: undefined,
   ratings: [],
   status: 'offline'
};

const _bowlingReducer = createReducer(
   bowlingState,
   on(actions.BowlingActions.getPlayersSuccess, (_state, { payload }) => ({ ..._state, players: payload })),
   on(actions.BowlingActions.bowlSuccess, (_state, { payload }) => ({ ..._state, game: payload.data, status: payload.status as 'offline' | 'online' })),
   on(actions.BowlingActions.newGame, (_state) => ({ ..._state, game: undefined })),
   on(actions.BowlingActions.getRatingsSuccess, (_state, { payload }) => ({ ..._state, ratings: payload.data, status: payload.status as 'offline' | 'online' })),
   on(actions.BowlingActions.setStatus, (_state, { payload }) => ({ ..._state, status: payload }))
);

export function bowlingReducer(state: any, action: Action)
{
   return _bowlingReducer(state, action);
}