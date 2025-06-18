import { TestBed } from '@angular/core/testing';

import { ScoreCalculatorService } from './score-calculator.service';
import { Bowler } from '../../../models/bowler';
import { Frame } from '../../../models/frame';

describe('ScoreCalculatorService', () => {
   let service: ScoreCalculatorService;
   const frame: Frame = {
      rolls: new Map<number, number>(),
      score: 0
   };

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [ScoreCalculatorService]
      });
      service = TestBed.inject(ScoreCalculatorService);
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });

   describe('when clearScoreSheet invoked', () => {
      it('should return a map of 10 frames', () => {
         const frames = service.clearScoreSheet();

         expect(frames.size).toBe(10);
      });
   });

   describe('when calculateBowlerScore invoked', () => {
      it('should return perfect game', () => {
         const bowler: Bowler = {
            name: 'Test Bowler',
            frames: new Map<number, any>(),
            score: 0,
            number: 0,
            rating: 0
         };

         generatePerfectGame(bowler);

         service.calculateBowlerScore(bowler);

         expect(bowler.score).toBe(300);
      });

      it('should return 190', () => {
         const bowler: Bowler = {
            name: 'Test Bowler',
            frames: new Map<number, any>(),
            score: 0,
            number: 0,
            rating: 0
         };

         generate190Game(bowler);

         service.calculateBowlerScore(bowler);

         expect(bowler.score).toBe(190);
      });

      it('should return 200', () => {
         const bowler: Bowler = {
            name: 'Test Bowler',
            frames: new Map<number, any>(),
            score: 0,
            number: 0,
            rating: 0
         };

         generate200Game(bowler);

         service.calculateBowlerScore(bowler);

         expect(bowler.score).toBe(200);
      });

      it('should return 50', () => {
         const bowler: Bowler = {
            name: 'Test Bowler',
            frames: new Map<number, any>(),
            score: 0,
            number: 0,
            rating: 0
         };

         for (let i = 1; i <= 10; i++) {
            bowler.frames.set(i, { ...frame, rolls: new Map<number, number>([[1, 3], [2, 2]]) });
         }

         service.calculateBowlerScore(bowler);

         expect(bowler.score).toBe(50);
      });
   });

   describe('when calculateWinner invoked', () => {
      it('should return winner', () => {
         const bowler1: Bowler = {
            name: 'Test Bowler1',
            frames: new Map<number, any>(),
            score: 110,
            number: 0,
            rating: 0
         };
         const bowler2: Bowler = {
            name: 'Test Bowler2',
            frames: new Map<number, any>(),
            score: 120,
            number: 0,
            rating: 0
         };

         const winner = service.calculateWinner([bowler1, bowler2]);

         expect(winner).toEqual({ name: 'Test Bowler2', score: 120 });
      });

      it('should return a tie', () => {
         const bowler1: Bowler = {
            name: 'Test Bowler1',
            frames: new Map<number, any>(),
            score: 120,
            number: 0,
            rating: 0
         };
         const bowler2: Bowler = {
            name: 'Test Bowler2',
            frames: new Map<number, any>(),
            score: 120,
            number: 0,
            rating: 0
         };

         const winner = service.calculateWinner([bowler1, bowler2]);

         expect(winner).toEqual({ name: 'Test Bowler1 and Test Bowler2', score: 120 });
      });
   });

   function generatePerfectGame(bowler: Bowler): void {
      for (let i = 1; i <= 10; i++) {
         bowler.frames.set(i, { ...frame, rolls: new Map<number, number>([[1, 10], [2, 0]]) });

         if (i === 10) {
            bowler.frames.get(i)!.rolls.set(2, 10);
            bowler.frames.get(i)!.rolls.set(3, 10);
         }
      }
   }

   function generate200Game(bowler: Bowler): void {
      for (let i = 1; i <= 10; i++) {
         if (i % 2 === 0)
            bowler.frames.set(i, { ...frame, rolls: new Map<number, number>([[1, 10], [2, 0]]) });
         else
            bowler.frames.set(i, { ...frame, rolls: new Map<number, number>([[1, 9], [2, 1]]) });

         if (i === 10) {
            bowler.frames.get(i)!.rolls.set(3, 10);
         }
      }
   }

   function generate190Game(bowler: Bowler): void {
      for (let i = 1; i <= 10; i++) {
         bowler.frames.set(i, { ...frame, rolls: new Map<number, number>([[1, 9], [2, 1]]) });

         if (i === 10) {
            bowler.frames.get(i)!.rolls.set(3, 9);
         }
      }
   }
});
