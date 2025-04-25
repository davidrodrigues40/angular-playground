import { Component, signal, WritableSignal } from '@angular/core';
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
  currentFunction: KeypadFunction | undefined = undefined;
  total: number = 0;

  displayNumbers: WritableSignal<string> = signal('0');

  numberPressed(key: number): void {
    this.numbersPressed.push(key);
    this.displayNumbers.set(this.numbersPressed.join(''));
  }

  functionPressed(key: KeypadInput): void {

    const keyPressed = key.value as KeypadFunction;
    if (keyPressed && keyPressed.value === KeypadFunctionType.Clear) {
      this.clear();
      return;
    }

    if (keyPressed && keyPressed.value === KeypadFunctionType.Equals) {
      this.calculate();
      return;
    }

    if (this.numbersPressed.length === 0) {
      return;
    }

    this.currentFunction = key.value as KeypadFunction;
    this.total = parseInt(this.numbersPressed.join(''));

    console.log(this.total);
    this.numbersPressed = [];
  }

  private calculate(): void {
    switch (this.currentFunction?.value) {
      case KeypadFunctionType.Add:
        this.add();
        break;
      case KeypadFunctionType.Subtract:
        this.subtract();
        break;
      default:
        break;
    }
  }

  private clear(): void {
    console.log('clear');
    this.numbersPressed = [];
    this.currentFunction = undefined;
    this.total = 0;
    this.displayNumbers.set(this.total.toString());
  }


  private add(): void {
    this.total += parseInt(this.numbersPressed.join(''));
    this.displayNumbers.set(this.total.toString());
  }

  private subtract(): void {
    this.total -= parseInt(this.numbersPressed.join(''));
    this.displayNumbers.set(this.total.toString());
  }
}
