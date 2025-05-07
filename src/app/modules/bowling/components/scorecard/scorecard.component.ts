import { Component, Input, OnInit } from '@angular/core';

import { FrameService } from '../../services/frame.service';
import { FrameComponent } from '../frame/frame.component';
import { Bowler } from '../../models/bowler';
import { Frame } from '../../models/frame';

@Component({
   selector: 'app-scorecard',
   templateUrl: './scorecard.component.html',
   styleUrls: ['./scorecard.component.scss'],
   standalone: true,
   providers: [FrameService],
   imports: [FrameComponent]
   standalone: true,
   providers: [FrameService],
   imports: [FrameComponent]
})
export class ScorecardComponent implements OnInit {
export class ScorecardComponent implements OnInit {
   @Input() bowler: Bowler = {
      number: 0,
      name: '',
      frames: new Map<number, Frame>(),
      score: 0,
      rating: 0
   };
   frames: Frame[] = [];

   constructor(private readonly _frameService: FrameService) { }

   ngOnInit(): void {
      ngOnInit(): void {
         if(this.bowler.frames instanceof Map)
         this.frames = Array.from(this.bowler.frames.values());
         else
         this.frames = Object.values(this.bowler.frames);
      }

      frameScore(frameScore: number, index: number): number {
         frameScore(frameScore: number, index: number): number {
            return this._frameService.calculateFrameValue(frameScore, index, this.frames);
         }
      }
