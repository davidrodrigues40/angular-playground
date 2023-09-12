import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent {
  @Input() teamName: string = 'Boston Red Sox';
  @Input() score: number = 0;
  @Input() buttonColor: 'primary' | 'accent' = 'primary';
  @Output() addRuns: EventEmitter<number> = new EventEmitter<number>();
  public runsToAdd: number = 0;
}
