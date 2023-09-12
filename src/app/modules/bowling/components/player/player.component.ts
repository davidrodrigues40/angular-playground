import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from 'src/app/state/bowling/models/player.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  @Input() player: Player = {
    number: 0,
    name: ''
  };

  @Input() score: number = 0;

  @Output() removePlayer = new EventEmitter<number>();
}
