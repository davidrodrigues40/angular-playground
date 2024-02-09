import { Bowler } from 'src/app/interfaces/models/bowling/bowler';
import { Frame } from 'src/app/interfaces/models/bowling/frame';

import { Component, Input, OnInit } from '@angular/core';

import { FrameService } from '../../services/frame.service';

@Component({
   selector: 'app-scorecard',
   templateUrl: './scorecard.component.html',
   styleUrls: ['./scorecard.component.scss'],
   providers: [FrameService]
})
export class BowlerComponent implements OnInit
{
   @Input() bowler: Bowler = {
      number: 0,
      name: '',
      frames: new Map<number, Frame>(),
      score: 0,
      rating: 0
   };
   frames: Frame[] = [];

   constructor(private readonly _frameService: FrameService) { }

   ngOnInit(): void
   {
      this.frames = Object.values(this.bowler.frames);
   }

   frameScore(frameScore: number, index: number): number
   {
      return this._frameService.calculateFrameValue(frameScore, index, this.frames);
   }
}
