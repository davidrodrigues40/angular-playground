import { Bowler } from 'src/app/interfaces/models/bowling/bowler';
import { Frame } from 'src/app/interfaces/models/bowling/frame';
import { Game } from 'src/app/interfaces/models/bowling/game';

import { Injectable } from '@angular/core';

import { BowlService } from '../bowl-service/bowl.service';
import { OfflineBowlingService } from '../offline-bowling.service';
import { ScoreCalculatorService } from '../score-calculator/score-calculator.service';

@Injectable()
export class GameService
{
   private get noBowlerError(): Error
   {
      return new Error('No bowlers provided');
   }

   constructor(
      private readonly _scoreCalculator: ScoreCalculatorService,
      private readonly _bowlService: BowlService,
      private readonly _bowlingService: OfflineBowlingService) { }

   newGame(bowlers: Array<Bowler>): Game
   {
      if (bowlers.length === 0)
         throw this.noBowlerError;

      const game: Game = {
         bowlers: []
      };

      bowlers.forEach(bowler =>
      {
         bowler.frames = this._scoreCalculator.clearScoreSheet();
         bowler.score = 0;
         game.bowlers.push(bowler);
      });

      return game;
   }

   playGame(game: Game): Game
   {
      if (game.bowlers.length === 0)
         throw this.noBowlerError;

      game.bowlers.forEach(bowler =>
      {
         for (let frameNumber = 1; frameNumber <= 10; frameNumber++)
         {
            this.playFrame(frameNumber, bowler);
         }

         this._scoreCalculator.calculateBowlerScore(bowler);
      });

      return game;
   }

   private addRoll(bowler: Bowler, frameNumber: number, ballNumber: number, pinsKnockedDown: number): void
   {
      const frame = bowler.frames.get(frameNumber) as Frame;

      if (frame)
         frame.rolls.set(ballNumber, pinsKnockedDown);
   }

   private playFrame(frameNumber: number, bowler: Bowler): void
   {
      if (frameNumber === 10)
      {
         this.playTenthFrame(frameNumber, bowler);
         return;
      }

      const firstBallPinCount = this._bowlService.rollFirstBall(this._bowlingService.getRating(bowler.rating));

      if (firstBallPinCount === 10)
         return;

      const secondBallPinCount = this._bowlService.rollSecondBall(this._bowlingService.getRating(bowler.rating), firstBallPinCount);
      this.addRoll(bowler, frameNumber, 2, secondBallPinCount);
   }

   private playTenthFrame(frameNumber: number, bowler: Bowler): void
   {
      const firstBallCount = this._bowlService.rollFirstBall(this._bowlingService.getRating(bowler.rating));
      let secondBallCount: number = 0;
      let thirdBallCount: number | undefined = undefined;

      this.addRoll(bowler, frameNumber, 1, firstBallCount);

      secondBallCount = firstBallCount == 10 ?
         this._bowlService.rollFirstBall(this._bowlingService.getRating(bowler.rating)) :
         this._bowlService.rollSecondBall(this._bowlingService.getRating(bowler.rating), firstBallCount);

      this.addRoll(bowler, frameNumber, 2, secondBallCount);

      if (firstBallCount + secondBallCount >= 10)
      {
         thirdBallCount = this._bowlService.rollFirstBall(this._bowlingService.getRating(bowler.rating));
         this.addRoll(bowler, frameNumber, 3, thirdBallCount);
      }
   }

}
