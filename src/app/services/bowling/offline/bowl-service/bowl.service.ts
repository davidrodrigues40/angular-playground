import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { Injectable } from '@angular/core';

@Injectable()
export class BowlService {
   rollFirstBall(rating: BowlerRating): number {
      return this.rollBall(rating, 10);
   }


   rollSecondBall(rating: BowlerRating, firstBall: number): number {
      return this.rollBall(rating, 10 - firstBall);
   }

   private rollBall(rating: BowlerRating, pins: number): number {
      const handycap: number = rating.key * 3;

      const random = this.getRandomNumber(pins);
      console.log('random', random);
      const pinsKnockedDown = Math.min((pins - random + handycap), pins);

      return Math.min(pins, pinsKnockedDown);
   }

   private getRandomNumber(pins: number): number {

      const num = Math.random();

      return Math.floor(num * pins);
   }
}
