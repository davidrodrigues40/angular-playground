import { Player } from 'src/app/interfaces/models/bowling/player';

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
   selector: 'app-player',
   templateUrl: './player.component.html',
   styleUrls: ['./player.component.scss']
})
export class PlayerComponent
{
   @Input() player: Player = {
      number: 0,
      name: '',
      rating: 0
   };

   @Input() rating: string = '';

   @Output() removePlayer = new EventEmitter<number>();
}
