import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { KeypadInput } from '../../models/keypad-input';

@Component({
  selector: 'app-keypad-button',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './keypad-button.component.html',
  styleUrl: './keypad-button.component.scss'
})
export class KeypadButtonComponent {
  @Input() key: KeypadInput = {
    display: '',
    value: undefined
  };
  @Output() pressed: EventEmitter<KeypadInput> = new EventEmitter<KeypadInput>();
} 
