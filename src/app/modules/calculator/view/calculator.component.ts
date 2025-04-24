import { Component } from '@angular/core';
import { NumberPad } from '../components/number-pad/number-pad.component';
import { FunctionPad } from '../components/function-pad/function-pad.component';
import { KeypadInput } from '../models/keypad-input';
import { KeypadFunction, KeypadFunctionType } from '../models/keypad-function';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    NumberPad,
    FunctionPad
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {

  numbersPressed: number[] = [];
  currentValue: number = 0;

  numberPressed(key: number): void {
    this.numbersPressed.push(key);
  }

  functionPressed(key: KeypadInput): void {
    if (this.numbersPressed.length === 0) {
      return;
    }

    switch ((key.value as KeypadFunction).value) {
      case KeypadFunctionType.Add:
        this.add();
        break;
      case KeypadFunctionType.Subtract:
        this.subtract();
        break;
      default:
        break;
    }
    this.currentValue += parseInt(this.numbersPressed.join(''));

    this.numbersPressed = [];
    console.log(this.currentValue);
  }

  private add(): void {
    this.currentValue += parseInt(this.numbersPressed.join(''));
  }

  private subtract(): void {
    this.currentValue -= parseInt(this.numbersPressed.join(''));
  }
}
