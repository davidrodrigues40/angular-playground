import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { HomeMenuService } from 'src/app/services/home-menu/home-menu.service';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as actions from './home-menu.actions';

@Injectable()
export class HomeMenuEffects
{
    constructor(private readonly _actions$: Actions,
        private readonly _service: HomeMenuService)
    { }

    getHomeMenu$ = createEffect(() => this._actions$.pipe(
        ofType(actions.homeMenuActions.getHomeMenu),
        mergeMap(() =>
            this._service.getHomeMenu$()
                .pipe(
                    map(homeMenu => actions.homeMenuActions.getHomeMenuSuccess({ payload: homeMenu })),
                    catchError(error => of(actions.homeMenuActions.getHomeMenuError({ payload: error })))
                ))
    ));
}