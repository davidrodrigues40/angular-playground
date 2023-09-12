import { Component, EventEmitter, Output } from '@angular/core';
import { Game } from 'src/app/state/game/game.model';

@Component({
  selector: 'app-enter-score',
  templateUrl: './enter-score.component.html',
  styleUrls: ['./enter-score.component.scss']
})
export class EnterScoreComponent {
  @Output() enterScore: EventEmitter<Game> = new EventEmitter<Game>();
  public homeScore: number = 0;
  public awayScore: number = 0;
}
