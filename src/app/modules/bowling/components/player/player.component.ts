import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Player } from '../../models/player';

@Component({
   selector: 'app-player',
   templateUrl: './player.component.html',
   styleUrls: ['./player.component.scss'],
   standalone: true,
   imports: [
      MatIconModule,
      MatFormFieldModule,
   ]
   styleUrls: ['./player.component.scss'],
   standalone: true,
   imports: [
      MatIconModule,
      MatFormFieldModule,
   ]
})
export class PlayerComponent {
export class PlayerComponent {
   @Input() player: Player = {
      number: 0,
      name: '',
      rating: 0
   };

   @Input() rating: string = '';

   @Output() removePlayer = new EventEmitter<number>();
}
