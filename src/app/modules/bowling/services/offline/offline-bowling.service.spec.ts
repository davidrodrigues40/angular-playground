import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { TestBed } from '@angular/core/testing';

import { GameService } from './game/game.service';
import { OfflineBowlingService } from './offline-bowling.service';
import { OfflineRatingService } from './offline-rating/offline-rating.service';
import { PlayerService } from './player/player.service';
import { RatingService } from '../online/rating/rating.service';
import { BowlingState } from '../../bowling.state';
import { Bowler } from '../../models/bowler';
import { Frame } from '../../models/frame';
import { Game } from '../../models/game';
import { Player } from '../../models/player';

describe('OfflineBowlingService', () => {
   let service: OfflineBowlingService;
   const mockPlayerService: jasmine.SpyObj<PlayerService> = jasmine.createSpyObj('PlayerService', ['generateBowlers']);
   const mockGameService: jasmine.SpyObj<GameService> = jasmine.createSpyObj('GameService', ['newGame', 'playGame']);
   const mockRatingService: jasmine.SpyObj<OfflineRatingService> = jasmine.createSpyObj('OfflineBowlingService', ['bowl$', 'getRatings$'], ['ratings']);
   let gameSetSpy: jasmine.Spy;
   let playersSetSpy: jasmine.Spy;
   let ratingsSpy: jasmine.Spy;
   let gameGetSpy: jasmine.Spy;

   const rating: BowlerRating = {
      key: 0,
      value: 'Beginner'
   };
   const ratings: Array<BowlerRating> = [rating];

   const player: Player = {
      number: 0,
      name: 'player1',
      rating: 0
   };

   const bowler: Bowler = {
      frames: new Map<number, Frame>(),
      score: 200,
      number: 0,
      name: 'player1',
      rating: 0
   }

   const game: Game = {
      bowlers: [bowler],
      winner: undefined,
      completed: false
   };

   beforeAll(() => {
   });

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [
            OfflineBowlingService,
            { provide: PlayerService, useValue: mockPlayerService },
            { provide: GameService, useValue: mockGameService },
            { provide: OfflineRatingService, useValue: mockRatingService },
            { provide: RatingService, useValue: mockRatingService },
         ]
      });

      service = TestBed.inject(OfflineBowlingService);
      TestBed.inject(PlayerService);
      TestBed.inject(GameService);
      TestBed.inject(OfflineRatingService);
      TestBed.inject(RatingService);

      jasmine.getEnv().allowRespy(true);
      gameSetSpy = spyOn(BowlingState.game, 'set');
      playersSetSpy = spyOn(BowlingState.players, 'set');
      ratingsSpy = spyOn(BowlingState.ratings, 'set');
      gameGetSpy = spyOn(BowlingState, 'game');
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });

   describe('when bowl invoked', () => {
      it('should throw error if no players provided', () => {
         expect(() => service.bowl([])).toThrowError('No players provided');
      });

      it('should call generateBowlers with players', () => {
         const players: ReadonlyArray<Player> = [player];
         mockGameService.newGame.and.returnValue(game);
         mockGameService.playGame.and.returnValue(game);
         mockPlayerService.generateBowlers.and.returnValue([bowler]);

         service.bowl(players);

         expect(mockPlayerService.generateBowlers).toHaveBeenCalledWith(players);
         expect(mockGameService.newGame).toHaveBeenCalledWith([bowler]);
         expect(mockGameService.playGame).toHaveBeenCalledWith(game);
         expect(gameSetSpy).toHaveBeenCalledWith(game);
         expect(playersSetSpy).toHaveBeenCalledWith(players);
      });
   });

   describe('when getRatings invoked', () => {
      it('should set ratings in state', () => {
         Object.defineProperty(mockRatingService, 'ratings', { get: () => ratings });

         service.getRatings();

         expect(ratingsSpy).toHaveBeenCalledWith(ratings);
      });
   });

   describe('when getScores invoked', () => {
      it('should return scores of all players', () => {
         const players: ReadonlyArray<Player> = [player];
         const expectedScores: Array<number> = [0];
         gameGetSpy.and.returnValue(game);

         mockGameService.newGame.and.returnValue(game);
         mockGameService.playGame.and.returnValue(game);

         service.bowl(players);

         const score = service.getScore(player.name);

         expect(score).toEqual(bowler.score);
      });

      it('should return 0 if player not found', () => {
         const players: ReadonlyArray<Player> = [player];
         gameGetSpy.and.returnValue(game);

         mockGameService.newGame.and.returnValue(game);
         mockGameService.playGame.and.returnValue(game);

         service.bowl(players);

         const score = service.getScore('non-existing-player');

         expect(score).toEqual(0);
      });
   });
});
