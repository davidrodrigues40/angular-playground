import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { Injectable } from '@angular/core';

@Injectable()
export class BowlService
{
   rollFirstBall(rating: BowlerRating): number
   {
      return this.rollBall(rating, 10);
   }


   rollSecondBall(rating: BowlerRating, firstBall: number): number
   {
      return this.rollBall(rating, 10 - firstBall);
   }

   private rollBall(rating: BowlerRating, pins: number): number
   {
      const handycap: number = rating.key * 3;

      const random = this.getRandomNumber(pins);
      const pinsKnockedDown = Math.min((pins - random + handycap), pins);

      return Math.min(pins, pinsKnockedDown);
   }

   private getRandomNumber(pins: number): number
   {
      const crypto = window.crypto;
      const array = new Int32Array(1);
      const num = crypto.getRandomValues(array);
      if (num[0] < 0)
         num[0] = num[0] * -1;
      num[0] = num[0] * Math.pow(2, -32);

      return Math.floor(num[0] * pins);
   }
}
