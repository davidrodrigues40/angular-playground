import { Game } from 'src/app/interfaces/models/bowling/game';
import { Player } from 'src/app/interfaces/models/bowling/player';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RatingService } from '../rating/rating.service';
import { BowlingService } from './bowling.service';
import { Bowler } from 'src/app/interfaces/models/bowling/bowler';
import { Frame } from 'src/app/interfaces/models/bowling/frame';
import { of } from 'rxjs';
import { BowlingState } from 'src/app/state/bowling.state';

describe('BowlingService', () => {
   let service: BowlingService;
   let httpClient: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get', 'post']);
   let ratingService: jasmine.SpyObj<RatingService> = jasmine.createSpyObj('RatingService', ['getRatings$']);
   let gameSetSpy: jasmine.Spy;
   let playersSetSpy: jasmine.Spy;
   let ratingsSetSpy: jasmine.Spy;

   const defaultGame: Game = {
      bowlers: [],
      winner: {
         name: '',
         score: 0
      },
      completed: false
   };
   const defaultPlayers: Player[] = [];
   const defaultRatings: BowlerRating[] = [];

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [
            BowlingService,
            { provide: HttpClient, useValue: httpClient },
            { provide: RatingService, useValue: ratingService },
         ]
      });

      TestBed.inject(RatingService);

      httpClient.post.calls.reset();
      ratingService.getRatings$.calls.reset();

      gameSetSpy = spyOn(BowlingState.game, 'set');
      playersSetSpy = spyOn(BowlingState.players, 'set');
      ratingsSetSpy = spyOn(BowlingState.ratings, 'set');

      service = TestBed.inject(BowlingService);

   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });

   describe('when bowl invoked', () => {
      it('should call bowl$ and set game and players in state', () => {
         const players: Player[] = [{ name: 'Player1', number: 1, rating: 1 }, { name: 'Player2', number: 2, rating: 2 }];
         const bowlers: Bowler[] = players.map((player, index) => {
            return {
               number: index,
               name: player.name,
               rating: player.rating,
               frames: new Map<number, Frame>(),
               score: 0
            };
         });
         const gameResponse: Game = { ...defaultGame, bowlers: bowlers, completed: true };
         httpClient.post.and.returnValue(of(gameResponse));

         service.bowl(players);

         expect(httpClient.post).toHaveBeenCalledWith('https://localhost:7067/api/game', players);
         expect(gameSetSpy).toHaveBeenCalledWith(gameResponse);
         expect(playersSetSpy).toHaveBeenCalledWith(players);
      });
   });

   describe('when getRatings invoked', () => {
      it('should call getRatings$ and set ratings in state', () => {
         const ratings: BowlerRating[] = [{ key: 1, value: 'Beginner' }];
         ratingService.getRatings$.and.returnValue(of(ratings));

         service.getRatings();

         expect(ratingService.getRatings$).toHaveBeenCalled();
         expect(ratingsSetSpy).toHaveBeenCalledWith(ratings);
      });
   });
});
