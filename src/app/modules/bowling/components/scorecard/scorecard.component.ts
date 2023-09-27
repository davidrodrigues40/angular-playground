import { Component, Input, OnInit } from '@angular/core';
import { Bowler } from 'src/app/state/bowling/models/bowler.model';
import { Frame } from 'src/app/state/bowling/models/frame.model';
import { FrameService } from '../../services/frame.service';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss'],
  providers: [FrameService]
})
export class BowlerComponent implements OnInit {
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
    this.frames = Object.values(this.bowler.frames);
  }

  roles(frame: Frame) {
    const values: number[] = Object.values(frame.roles);
    return this._frameService.getFrameValues(values);
  }

  frameScore(frameScore: number, index: number): number {
    return this._frameService.calculateFrameValue(frameScore, index, this.frames);
  }
}
