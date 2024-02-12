import { EMPTY, Observable, catchError, map, mergeMap, switchMap } from 'rxjs';
import { BowlingHttpResponse } from 'src/app/interfaces/models/bowling/bowling-http-response';
import { Game } from 'src/app/interfaces/models/bowling/game';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';
import { OfflineBowlingService } from 'src/app/services/bowling/offline/offline-bowling.service';
import { BowlingService } from 'src/app/services/bowling/online/bowling/bowling.service';
import { PlayersService } from 'src/app/services/players/players.service';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as actions from './bowling.actions';
import { BowlingStateService } from './service/bowling-state.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { DialogOptions } from 'src/app/interfaces/models/dialog-options';

@Injectable()
export class BowlingEffects
{
   constructor(private readonly _actions$: Actions,
      private readonly _offlineService: OfflineBowlingService,
      private readonly _bowlingService: BowlingService,
      private readonly _bowlingStateService: BowlingStateService,
      private readonly _notificationService: NotificationService,
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
         this._bowlingStateService.observables.status$
            .pipe(
               switchMap(available =>
               {
                  const response: BowlingHttpResponse<Game> = { status: 'offline', data: {} as Game };
                  if (available === 'online')
                     return this._bowlingService.bowl$(action.payload).pipe(
                        map(game =>
                        {
                           response.status = 'online';
                           response.data = game;
                           return response;
                        }),
                        catchError(error => this.handleOffline())
                     );

                  return this._offlineService.bowl$(action.payload).pipe(map(game => 
                  {
                     response.data = game;
                     return response;
                  }));
               }),
               map(response =>
               {
                  return actions.BowlingActions.bowlSuccess({ payload: response });
               })
            ))
   ));

   getRatings$ = createEffect(() => this._actions$.pipe(
      ofType(actions.BowlingActions.getRatings),
      mergeMap(() =>
      {
         return this._bowlingStateService.observables.status$
            .pipe(
               switchMap(available =>
               {
                  const response: BowlingHttpResponse<Array<BowlerRating>> = { status: 'offline', data: [] };
                  if (available === 'online')
                     return this._bowlingService.getRatings$().pipe(
                        map(ratings => 
                        {
                           response.status = 'online';
                           response.data = ratings;
                           return response;

                        }),
                        catchError(error => EMPTY)
                     );

                  return this._offlineService.getRatings$().pipe(map(ratings => 
                  {
                     response.data = ratings;
                     return response;
                  }));
               }),
               map(response =>
               {
                  return actions.BowlingActions.getRatingsSuccess({ payload: response });
               })
            )
      })
   ));

   changeAllPlayersRatings$ = createEffect(() => this._actions$.pipe(
      ofType(actions.BowlingActions.changeAllPlayersRatings),
      mergeMap(action =>
         this._playerService.changePlayerRatings$(action.payload.rating, action.payload.players)
            .pipe(
               map(players => actions.BowlingActions.getPlayersSuccess({ payload: players }))
            ))
   ));

   private handleOffline(): Observable<never>
   {
      const options: DialogOptions = {
         cancelButton: {
            text: 'Ok',
            action: 'cancel',
            reason: 'cancel'
         }
      };
      this._notificationService.notify(options, 'The service is currently available. Please switch to offline mode.');

      return EMPTY;
   }
}