import { Component, Input } from '@angular/core';
import { FrameService } from 'src/app/services/bowling/frame.service';
import { Bowler } from 'src/app/state/bowling/models/bowler.model';
import { Frame } from 'src/app/state/bowling/models/frame.model';

@Component({
  selector: 'app-bowler',
  templateUrl: './bowler.component.html',
  styleUrls: ['./bowler.component.scss'],
  providers: [FrameService]
})
export class BowlerComponent {
  @Input() bowler: Bowler = {
    number: 0,
    name: '',
    frames: new Map<number, Frame>(),
    score: 0
  }

  constructor(private readonly _frameService: FrameService) { }

  frames(): Frame[] {
    return Object.values(this.bowler.frames);
  };

  roles(frame: Frame) {
    const values: number[] = Object.values(frame.roles);
    return this._frameService.getFrameValues(values);
  }
}
