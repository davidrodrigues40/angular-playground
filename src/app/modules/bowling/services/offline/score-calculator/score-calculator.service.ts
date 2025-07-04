import { Injectable } from '@angular/core';
import { Bowler } from '../../../models/bowler';
import { Frame } from '../../../models/frame';
import { Scorecard } from '../../../models/scorecard';

@Injectable()
export class ScoreCalculatorService {
   clearScoreSheet(): Map<number, Frame> {
      const frames: Map<number, Frame> = new Map<number, Frame>();

      for (let x: number = 1; x <= 10; x++) {
         frames.set(x, { rolls: new Map<number, number>(), score: 0 });
      }

      return frames;
   }

   calculateWinner(players: Array<Bowler>): Scorecard {
      const firstPlayer = players[0];
      let winner: Scorecard = { name: firstPlayer.name, score: firstPlayer.score };

      players.forEach((player: any) => {
         if (player.score === winner.score && player.name !== winner.name) {
            winner.name += ` and ${player.name}`;
         } else if (player.score > winner.score) {
            winner = { name: player.name, score: player.score };
         }
      });

      return winner;
   }

   calculateBowlerScore(bowler: Bowler): void {
      for (let x: number = 1; x <= 10; x++) {
         let nextFrame: Frame;
         const frame: Frame = bowler.frames.get(x)!;

         switch (x) {
            case 10:
               this.calculateTenthFrameScore(frame);
               break;
            case 9:
               nextFrame = bowler.frames.get(10)!;
               this.calculateNinthFrame(frame, nextFrame);
               break;
            default:
               {
                  nextFrame = bowler.frames.get(x + 1)!;
                  const nextNextFrame = bowler.frames.get(x + 2)!;
                  this.calculateFrameScore(frame, nextFrame, nextNextFrame);
                  break;
               }
         }

         bowler.score += frame.score;
      }
   }

   private calculateFrameScore(frame: Frame, nextFrame: Frame, nextNextFrame: Frame): void {
      frame.score = 0;

      if (frame.rolls.get(1) === 10)
         this.calculateStrike(frame, nextFrame, nextNextFrame);
      else if ((frame.rolls.get(1)! + frame.rolls.get(2)!) === 10)
         this.calculateSpare(frame, nextFrame);
      else
         this.calculateOpenFrame(frame);

   }

   private calculateTenthFrameScore(frame: Frame): void {
      const frameOne: number | undefined = frame.rolls.get(1);
      const frameTwo: number | undefined = frame.rolls.get(2);

      if (frameOne && frameOne === 10)
         frame.score = 10 + frame.rolls.get(2)! + frame.rolls.get(3)!;
      else if (frameOne && frameTwo && frameOne + frameTwo === 10)
         frame.score = 10 + frame.rolls.get(3)!;
      else
         this.calculateOpenFrame(frame);
   }

   private calculateNinthFrame(frame: Frame, nextFrame: Frame): void {
      const frameOne: number | undefined = frame.rolls.get(1);
      const frameTwo: number | undefined = frame.rolls.get(2);

      if (frameOne && frameOne === 10)
         frame.score = 10 + nextFrame.rolls.get(1)! + nextFrame.rolls.get(2)!;
      else if (frameOne && frameTwo && frameOne + frameTwo === 10)
         frame.score = 10 + nextFrame.rolls.get(1)!;
      else
         this.calculateOpenFrame(frame);
   }

   private calculateOpenFrame(frame: Frame): void {
      frame.score = frame.rolls.get(1)! + frame.rolls.get(2)!;
   }

   private calculateSpare(frame: Frame, nextFrame: Frame): void {
      frame.score = 10 + nextFrame.rolls.get(1)!;
   }

   private calculateStrike(frame: Frame, nextFrame: Frame, nextNextFrame: Frame): void {
      const nextFrameRollOne: number | undefined = nextFrame.rolls.get(1);
      const nextFrameRollTwo: number | undefined = nextFrame.rolls.get(2);
      const nextNextFrameRollOne: number | undefined = nextNextFrame.rolls.get(1);

      frame.score = 10;

      if (nextFrameRollOne) {
         if (nextFrameRollOne === 10 && nextNextFrameRollOne)
            frame.score = 20 + nextNextFrameRollOne;
         else if (nextFrameRollTwo)
            frame.score = 10 + nextFrameRollOne + nextFrameRollTwo;
      }
   }
}
