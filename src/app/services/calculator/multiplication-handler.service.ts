import { Injectable } from '@angular/core';
import { CalculatorOperationHandler } from './calculator-operation-handler';
import { KeypadFunctionType } from 'src/app/modules/calculator/models/keypad-function';

@Injectable()
export class MultiplicationHandler implements CalculatorOperationHandler {
  handles: KeypadFunctionType = KeypadFunctionType.Multiply;

  handle(currentValue: number, input: number): number {
    return currentValue * input;
  }
}
