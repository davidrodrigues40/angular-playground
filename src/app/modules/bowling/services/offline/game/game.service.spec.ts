
import { TestBed } from '@angular/core/testing';

import { BowlService } from '../bowl-service/bowl.service';
import { OfflineRatingService } from '../offline-rating/offline-rating.service';
import { ScoreCalculatorService } from '../score-calculator/score-calculator.service';
import { GameService } from './game.service';
import { Frame } from '../../../models/frame';
import { Bowler } from '../../../models/bowler';
import { Game } from '../../../models/game';

describe('GameService', () => {
   let service: GameService;
   const scoreCalculator: jasmine.SpyObj<ScoreCalculatorService> = jasmine.createSpyObj('ScoreCalculatorService',
      ['clearScoreSheet', 'calculateBowlerScore', 'calculateWinner']);
   const bowlService: jasmine.SpyObj<BowlService> = jasmine.createSpyObj('BowlService', ['rollFirstBall', 'rollSecondBall', 'rollBall']);
   const ratingService: jasmine.SpyObj<OfflineRatingService> = jasmine.createSpyObj('RatingService', ['getRatings$', 'getRating']);

   const bowler: Bowler = {
      frames: new Map<number, Frame>(),
      score: 0,
      number: 0,
      name: '',
      rating: 0
   };
   const frame: Frame = {
      rolls: new Map<number, number>(),
      score: 0
   };

   const frames: Map<number, Frame> = new Map<number, Frame>();

   beforeAll(() => {
      for (let i = 1; i <= 10; i++) {
         frames.set(i, { ...frame });
      }
   });

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [
            GameService,
            { provide: ScoreCalculatorService, useValue: scoreCalculator },
            { provide: BowlService, useValue: bowlService },
            { provide: OfflineRatingService, useValue: ratingService }
         ]
      });
      service = TestBed.inject(GameService);

      scoreCalculator.calculateBowlerScore.calls.reset();
      scoreCalculator.clearScoreSheet.calls.reset();
      ratingService.getRatings$.calls.reset();
      ratingService.getRating.calls.reset();
      bowlService.rollFirstBall.calls.reset();
      bowlService.rollSecondBall.calls.reset();
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });

   describe('when newGame is called', () => {
      it('should throw an error if no bowlers are provided', () => {
         // Arrange
         const bowlers: Array<Bowler> = [];

         // Act
         const act = () => service.newGame(bowlers);

         // Assert
         expect(act).toThrowError('No bowlers provided');
      });

      it('should return a new game', () => {
         // Arrange

         const bowlers: Array<Bowler> = [{ ...bowler, name: 'Bowler 1' }];

         // Act
         const game = service.newGame(bowlers);

         // Assert
         expect(game.bowlers).toEqual(bowlers);
      });
   });

   describe('when playGame is called', () => {
      it('should throw an error if no bowlers are provided', () => {
         // Arrange
         const game: Game = { bowlers: [], completed: false };

         // Act
         const act = () => service.playGame(game);

         // Assert
         expect(act).toThrowError('No bowlers provided');
      });

      it('should play a game', () => {
         // Arrange
         const bowler1: Bowler = { ...bowler, name: 'Bowler 1', frames: frames };
         const bowler2: Bowler = { ...bowler, name: 'Bowler 2', frames: frames };
         const game: Game = { bowlers: [bowler1, bowler2], completed: false };
         scoreCalculator.calculateBowlerScore.and.callFake((b: Bowler) => b.score = 100);

         // Act
         const result = service.playGame(game);

         // Assert
         expect(result).toEqual(game);
         expect(scoreCalculator.calculateBowlerScore).toHaveBeenCalledTimes(2);
         expect(scoreCalculator.calculateBowlerScore).toHaveBeenCalledWith(bowler1);
         expect(scoreCalculator.calculateBowlerScore).toHaveBeenCalledWith(bowler2);
         expect(bowler1.score).toBe(100);
         expect(bowler2.score).toBe(100);
      });

      it('should calculate all strikes', () => {
         const bowler1: Bowler = { ...bowler, name: 'Bowler 1', frames: frames };
         const bowler2: Bowler = { ...bowler, name: 'Bowler 2', frames: frames };
         const game: Game = { bowlers: [bowler1, bowler2], completed: false };

         bowlService.rollFirstBall.and.returnValue(10);
         scoreCalculator.calculateBowlerScore.and.callFake((b: Bowler) => b.score = 300);
         scoreCalculator.clearScoreSheet.and.returnValue(frames);

         // Act
         const result = service.playGame(game);

         // Assert
         expect(result).toEqual(game);
         expect(scoreCalculator.calculateBowlerScore).toHaveBeenCalledTimes(2);
         expect(scoreCalculator.calculateBowlerScore).toHaveBeenCalledWith(bowler1);
         expect(scoreCalculator.calculateBowlerScore).toHaveBeenCalledWith(bowler2);
         expect(bowler1.score).toBe(300);
         expect(bowler2.score).toBe(300);
      });

      it('should calculate all spares', () => {
         const bowler1: Bowler = { ...bowler, name: 'Bowler 1', frames: frames };
         const bowler2: Bowler = { ...bowler, name: 'Bowler 2', frames: frames };
         const game: Game = { bowlers: [bowler1, bowler2], completed: false };

         bowlService.rollFirstBall.and.returnValue(9);
         bowlService.rollSecondBall.and.returnValue(1);
         scoreCalculator.calculateBowlerScore.and.callFake((b: Bowler) => b.score = 190);
         scoreCalculator.clearScoreSheet.and.returnValue(frames);

         // Act
         const result = service.playGame(game);

         // Assert
         expect(result).toEqual(game);
         expect(scoreCalculator.calculateBowlerScore).toHaveBeenCalledTimes(2);
         expect(scoreCalculator.calculateBowlerScore).toHaveBeenCalledWith(bowler1);
         expect(scoreCalculator.calculateBowlerScore).toHaveBeenCalledWith(bowler2);
         expect(bowler1.score).toBe(190);
         expect(bowler2.score).toBe(190);
      });
   });
});
