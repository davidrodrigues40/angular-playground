import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NumberPad } from '../components/number-pad/number-pad.component';
import { FunctionPad } from '../components/function-pad/function-pad.component';
import { KeypadInput } from '../models/keypad-input';
import { KeypadFunction, KeypadFunctionType } from '../models/keypad-function';
import { CalculatorOperationHandler } from 'src/app/modules/calculator/services/calculator-operation-handler';
import { OperationFactory } from 'src/app/modules/calculator/services/operation-factory.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    NumberPad,
    FunctionPad
  ],
  providers: [
    OperationFactory,
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent implements OnInit {

  private readonly operationFactory: OperationFactory = inject(OperationFactory);
  private readonly functionKeys: string[] = ['+', '-', '*', '/', '=', 'Enter', 'Escape', 'C'];
  private pressedNumbers: number[] = [];
  private previousFunction: KeypadFunction | undefined = undefined;

  total: number = 0;
  displayNumbers: WritableSignal<string> = signal('0');

  ngOnInit(): void {
    var div = document.getElementById('calculator') as HTMLDivElement;
    div.addEventListener('keyup', (event: KeyboardEvent) => {
      return this.keyPressed(event);
    });
  }

  numberPressed(key: number): void {
    this.pressedNumbers.push(key);
    this.displayNumbers.set(this.pressedNumbers.join(''));
  }

  functionPressed(key: KeypadInput): void {
    const keyPressed: KeypadFunction = key.value as KeypadFunction;

    this.processFunction(keyPressed);
  }

  private processFunction(func: KeypadFunction): void {
    switch (func.value) {
      case KeypadFunctionType.Equals:
        this.calculate();
        this.resetFunctions();
        return;
      case KeypadFunctionType.Clear:
        this.clear();
        return;
      default:
        if (this.previousFunction)
          this.calculate();
        else if (this.pressedNumbers.length > 0)
          this.total = parseInt(this.pressedNumbers.join(''));

        this.previousFunction = func;

        this.pressedNumbers = [];
        break;
    }
  }

  private calculate(): void {
    if (!this.previousFunction)
      return;

    let handler: CalculatorOperationHandler | undefined = this.operationFactory.createOperationHandler(this.previousFunction?.value as KeypadFunctionType);

    this.setTotal(handler!);
  }

  private setTotal(handler: CalculatorOperationHandler): void {
    this.total = handler.handle(this.total, parseInt(this.pressedNumbers.join('')));
    this.displayNumbers.set(this.total.toString());
  }

  private resetFunctions(): void {
    this.pressedNumbers = [];
    this.previousFunction = undefined;
  }

  private clear(): void {
    this.resetFunctions();
    this.total = 0;
    this.displayNumbers.set(this.total.toString());
  }

  private keyPressed(key: KeyboardEvent): boolean {
    const value: number = parseInt(key.key);

    if (!isNaN(value))
      this.numberPressed(value);

    const functionKey: KeypadFunction = new KeypadFunction(key.key, this.getFunctionType(key.key));

    if (functionKey.value === KeypadFunctionType.Invalid)
      return false;
    else
      this.processFunction(functionKey);

    return true;
  }

  private getFunctionType(key: string): KeypadFunctionType {
    console.log(`Key pressed: ${key}`);
    switch (key) {
      case '+':
        return KeypadFunctionType.Add;
      case '-':
        return KeypadFunctionType.Subtract;
      case '*':
        return KeypadFunctionType.Multiply;
      case '/':
        return KeypadFunctionType.Divide;
      case '=':
      case 'Enter':
        return KeypadFunctionType.Equals;
      case 'C':
      case 'Escape':
        return KeypadFunctionType.Clear;
      default:
        return KeypadFunctionType.Invalid;
    }
  }

}
