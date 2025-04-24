import { Component, EventEmitter, Output } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { KeypadInput } from '../../models/keypad-input';
import { KeypadFunction, KeypadFunctionType } from '../../models/keypad-function';
import { KeypadButtonComponent } from '../keypad-button/keypad-button.component';

@Component({
  selector: 'app-function-pad',
  standalone: true,
  imports: [
    MatGridListModule,
    KeypadButtonComponent
  ],
  templateUrl: './function-pad.component.html',
  styleUrl: './function-pad.component.scss'
})
export class FunctionPad {
  @Output() keyPressed: EventEmitter<KeypadInput> = new EventEmitter<KeypadInput>();

  protected readonly operationKeys: KeypadInput[] = [
    { display: '+', value: new KeypadFunction("+", KeypadFunctionType.Add) },
    { display: '-', value: new KeypadFunction("-", KeypadFunctionType.Subtract) },
  ];
}
