import { KeypadFunctionType } from "src/app/modules/calculator/models/keypad-function";

export interface CalculatorOperationHandler {
    handles: KeypadFunctionType;
    stringHandlers: string[];

    handle(currentValue: number, input: number): number;
}