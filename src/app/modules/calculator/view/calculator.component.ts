import { Component } from '@angular/core';
import { NumberPad } from '../components/number-pad/number-pad.component';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    NumberPad
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

  calculate(): void {
    if (this.numbersPressed.length === 0) {
      return;
    }
    this.currentValue += parseInt(this.numbersPressed.join(''));

    this.numbersPressed = [];
    console.log(this.currentValue);
  }
}
