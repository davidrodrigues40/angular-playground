import { of } from 'rxjs';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { TestBed, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { BowlingState } from '../bowling.state';
import { BowlingGame } from '../models/bowling-game.model';
import { Scorecard } from '../models/scorecard.model';
import { BowlingStateService } from './bowling-state.service';

describe('BowlingStateService', () =>
{
   let service: BowlingStateService;
   let store: MockStore<BowlingState>;
   const defaultRatings: BowlerRating[] = [];

   const defaultWinner: Scorecard = {
      name: '',
      score: 0,
   };

   const defaultGame: BowlingGame = {
      bowlers: [],
      winner: defaultWinner
   };

   const initialState: BowlingState = {
      players: [],
      ratings: [],
      game: defaultGame
   };

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         providers: [
            BowlingStateService,
            provideMockStore<BowlingState>({ initialState })
         ]
      });
      store = TestBed.inject(MockStore);
      service = TestBed.inject(BowlingStateService);
   });

   it('should be created', () =>
   {
      expect(service).toBeTruthy();
   });

   describe('events', () =>
   {
      describe('when getPlayers invoked', () =>
      {
         it('should dispatch getPlayers action', () =>
         {
            spyOn(store, 'dispatch');

            service.events.getPlayers();

            expect(store.dispatch).toHaveBeenCalled();
         });
      });

      describe('when addPlayer invoked', () =>
      {
         it('should dispatch addPlayer action', () =>
         {
            spyOn(store, 'dispatch');

            service.events.addPlayer('chuck', 0, []);

            expect(store.dispatch).toHaveBeenCalled();
         });
      });

      describe('when removePlayer invoked', () =>
      {
         it('should dispatch removePlayer action', () =>
         {
            spyOn(store, 'dispatch');

            service.events.removePlayer(1, []);

            expect(store.dispatch).toHaveBeenCalled();
         });
      });

      describe('when bowl invoked', () =>
      {
         it('should dispatch bowl action', () =>
         {
            spyOn(store, 'dispatch');

            service.events.bowl([]);

            expect(store.dispatch).toHaveBeenCalled();
         });
      });

      describe('when getRatings invoked', () =>
      {
         it('should dispatch getRatings action', () =>
         {
            spyOn(store, 'dispatch');

            service.events.getRatings();

            expect(store.dispatch).toHaveBeenCalled();
         });
      });

      describe('when newGame invoked', () =>
      {
         it('should dispatch newGame action', () =>
         {
            spyOn(store, 'dispatch');

            service.events.newGame();

            expect(store.dispatch).toHaveBeenCalled();
         });
      });

      describe('when changeAllPlayersRatings invoked', () =>
      {
         it('should dispatch changeAllPlayersRatings action', () =>
         {
            spyOn(store, 'dispatch');

            service.events.changeAllPlayersRatings(0, []);

            expect(store.dispatch).toHaveBeenCalled();
         });
      });
   });

   describe('observables', () =>
   {
      describe('when players$ invoked', () =>
      {
         it('should return players observable', waitForAsync(() =>
         {
            spyOn(store, 'select').and.returnValue(of([]));

            service.observables.players$
               .subscribe(players =>
               {
                  expect(players).toEqual([]);
               });
         }));
      });

      describe('when game$ invoked', () =>
      {
         it('should return game observable', waitForAsync(() =>
         {
            spyOn(store, 'select').and.returnValue(of(defaultGame));

            service.observables.game$
               .subscribe(game =>
               {
                  expect(game).toEqual(defaultGame);
               });
         }));
      });

      describe('when winner$ invoked', () =>
      {
         it('should return winner observable', waitForAsync(() =>
         {
            spyOn(store, 'select').and.returnValue(of(defaultWinner));

            service.observables.winner$
               .subscribe(winner =>
               {
                  expect(winner).toEqual(defaultWinner);
               });
         }));
      });

      describe('when ratings$ invoked', () =>
      {
         it('should return ratings observable', waitForAsync(() =>
         {
            spyOn(store, 'select').and.returnValue(of(defaultRatings));

            service.observables.ratings$
               .subscribe(ratings =>
               {
                  expect(ratings).toEqual(defaultRatings);
               });
         }));
      });

      describe('when score$ invoked', () =>
      {
         it('should return score observable', waitForAsync(() =>
         {
            spyOn(store, 'select').and.returnValue(of(310))

            service.observables.score$('chuck')
               .subscribe(score =>
               {
                  expect(score).toEqual(310);
               });
         }));
      });

      describe('when rating$ invoked', () =>
      {
         it('should return rating observable', waitForAsync(() =>
         {
            spyOn(store, 'select').and.returnValue(of(defaultRatings[0]))

            service.observables.rating$(1)
               .subscribe(rating =>
               {
                  expect(rating).toEqual(defaultRatings[0]);
               });
         }));
      });
   });
});
