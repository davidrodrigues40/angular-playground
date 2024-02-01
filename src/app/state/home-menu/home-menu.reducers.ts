import { createReducer, on } from "@ngrx/store";
import { HomeMenuState } from "./home-menu.state";
import * as actions from './home-menu.actions';

const homeMenuState: HomeMenuState = {
    items: []
};

const _homeMenuReducer = createReducer(
    homeMenuState,
    on(actions.homeMenuActions.getHomeMenuSuccess, (_state, { payload }) => ({ ..._state, items: payload }))
);

export function homeMenuReducer(state: any, action: any)
{
    return _homeMenuReducer(state, action);
};