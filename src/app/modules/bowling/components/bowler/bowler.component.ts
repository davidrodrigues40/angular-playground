import { Component, Input } from '@angular/core';
import { Bowler } from 'src/app/state/bowling/models/bowler.model';
import { Frame } from 'src/app/state/bowling/models/frame.model';

@Component({
  selector: 'app-bowler',
  templateUrl: './bowler.component.html',
  styleUrls: ['./bowler.component.scss'],
})
export class BowlerComponent {
  @Input() bowler: Bowler = {
    number: 0,
    name: '',
    frames: new Map<number, Frame>(),
    score: 0
  }
}
