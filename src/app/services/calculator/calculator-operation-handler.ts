import { KeypadFunctionType } from "src/app/modules/calculator/models/keypad-function";

export interface CalculatorOperationHandler {
    handles: KeypadFunctionType;
    handle(currentValue: number, input: number): number;
}