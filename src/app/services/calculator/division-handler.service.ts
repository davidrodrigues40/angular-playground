import { Injectable } from '@angular/core';
import { CalculatorOperationHandler } from './calculator-operation-handler';
import { KeypadFunctionType } from 'src/app/modules/calculator/models/keypad-function';

@Injectable()
export class DivisionHandler implements CalculatorOperationHandler {
  handles: KeypadFunctionType = KeypadFunctionType.Divide;

  handle(currentValue: number, input: number): number {
    if (input === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return currentValue / input;
  }
}
