import { Injectable } from '@angular/core';
import { CalculatorOperationHandler } from './calculator-operation-handler';
import { KeypadFunctionType } from 'src/app/modules/calculator/models/keypad-function';

@Injectable()
export class SubtractionHandler implements CalculatorOperationHandler {
  handles: KeypadFunctionType = KeypadFunctionType.Subtract;

  handle(currentValue: number, input: number): number {
    return currentValue - input;
  }
}
