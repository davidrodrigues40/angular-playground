import { Frame } from 'src/app/interfaces/models/bowling/frame';

import { Injectable } from '@angular/core';

@Injectable()
export class FrameService
{
   #strike: string = 'X';
   #spare: string = '/';

   getFrameValues(values: number[]): string[]
   {

      const value1: string = this.caclulateValue1(values[0]);
      const value2: string = this.caclulateValue2(values[0], values[1]);

      if (values.length == 3)
         return [value1, value2, this.caclulateValue1(values[2])];

      return [value1, value2];
   }

   calculateFrameValue(score: number, currentIndex: number, frames: Frame[]): number
   {
      if (currentIndex === 0)
         return score;

      let currentScore = frames.filter((frame, index) => index < currentIndex).map(x => x.score).reduce((a, b) => a + b, 0);

      return currentScore + score;
   }

   private caclulateValue1(value: number): string
   {
      if (value == 10)
         return this.#strike;

      return value.toString();
   }

   private caclulateValue2(value1: number, value2: number): string
   {
      if (!value2) return '';
      if (value2 == 10) return this.#strike;
      if (value1 + value2 == 10)
         return this.#spare;

      return value2.toString();
   }
}
