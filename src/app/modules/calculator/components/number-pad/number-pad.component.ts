import { Component, EventEmitter, Output } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { KeypadButtonComponent } from '../keypad-button/keypad-button.component';
import { KeypadInput } from '../../models/keypad-input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-keypad',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    KeypadButtonComponent],
  templateUrl: './number-pad.component.html',
  styleUrl: './number-pad.component.scss'
})
export class NumberPad {
  @Output() keyPressed: EventEmitter<number> = new EventEmitter<number>();

  protected readonly numberKeys: KeypadInput[] = [
    { display: '1', value: 1 },
    { display: '2', value: 2 },
    { display: '3', value: 3 },
    { display: '4', value: 4 },
    { display: '5', value: 5 },
    { display: '6', value: 6 },
    { display: '7', value: 7 },
    { display: '8', value: 8 },
    { display: '9', value: 9 },
    { display: '', value: undefined },
    { display: '0', value: 0 },
    { display: '', value: undefined },
  ];

  keypadButtonPressed(key: KeypadInput): void {
    if (key.value !== undefined) {
      this.keyPressed.emit(key.value);
    }
  }
}
