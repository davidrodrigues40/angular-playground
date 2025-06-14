import { Injectable } from '@angular/core';
import { AddHandler } from './add-handler.service';
import { DivisionHandler } from './division-handler.service';
import { MultiplicationHandler } from './multiplication-handler.service';
import { SubtractionHandler } from './subtraction-handler.service';
import { KeypadFunctionType } from 'src/app/modules/calculator/models/keypad-function';
import { CalculatorOperationHandler } from './calculator-operation-handler';

@Injectable()
export class OperationFactory {
  createOperationHandler(type: KeypadFunctionType): CalculatorOperationHandler | undefined {
    return operationHandlers.find(handler => handler.handles === type) || undefined;
  }
}

const operationHandlers: CalculatorOperationHandler[] = [
  new AddHandler(),
  new SubtractionHandler(),
  new MultiplicationHandler(),
  new DivisionHandler()
];