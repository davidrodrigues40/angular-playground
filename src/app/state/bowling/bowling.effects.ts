import { map, mergeMap } from 'rxjs';
import { BowlingService } from 'src/app/services/bowling/online/bowling.service';
import { PlayersService } from 'src/app/services/players/players.service';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as actions from './bowling.actions';

@Injectable()
export class BowlingEffects
{
   constructor(private readonly _actions$: Actions,
      private readonly _bowlingService: BowlingService,
      private readonly _playerService: PlayersService) { }

   getPlayers$ = createEffect(() => this._actions$.pipe(
      ofType(actions.BowlingActions.getPlayers),
      mergeMap(() =>
         this._playerService.getPlayers$()
            .pipe(
               map(players => actions.BowlingActions.getPlayersSuccess({ payload: players }))
            ))
   ));

   newGame$ = createEffect(() => this._actions$.pipe(
      ofType(actions.BowlingActions.newGame),
      mergeMap(() =>
         this._playerService.removeAllPlayers$()
            .pipe(
               map(players => actions.BowlingActions.getPlayersSuccess({ payload: players }))
            ))
   ));

   addPlayer$ = createEffect(() => this._actions$.pipe(
      ofType(actions.BowlingActions.addPlayer),
      mergeMap(action =>
         this._playerService.addPlayer$(action.payload.name, action.payload.rating, action.payload.players)
            .pipe(
               map(players => actions.BowlingActions.getPlayersSuccess({ payload: players }))
            ))
   ));

   removePlayer$ = createEffect(() => this._actions$.pipe(
      ofType(actions.BowlingActions.removePlayer),
      mergeMap(action =>
         this._playerService.removePlayer$(action.payload.id, action.payload.players)
            .pipe(
               map(players => actions.BowlingActions.getPlayersSuccess({ payload: players }))
            ))
   ));

   bowl$ = createEffect(() => this._actions$.pipe(
      ofType(actions.BowlingActions.bowl),
      mergeMap(action =>
         this._bowlingService.bowl$(action.payload)
            .pipe(
               map(game => actions.BowlingActions.bowlSuccess({ payload: game }))
            ))
   ));

   getRatings$ = createEffect(() => this._actions$.pipe(
      ofType(actions.BowlingActions.getRatings),
      mergeMap(() =>
         this._bowlingService.getRatings$()
            .pipe(
               map(ratings => actions.BowlingActions.getRatingsSuccess({ payload: ratings }))
            ))
   ));

   changeAllPlayersRatings$ = createEffect(() => this._actions$.pipe(
      ofType(actions.BowlingActions.changeAllPlayersRatings),
      mergeMap(action =>
         this._playerService.changePlayerRatings$(action.payload.rating, action.payload.players)
            .pipe(
               map(players => actions.BowlingActions.getPlayersSuccess({ payload: players }))
            ))
   ));
}