export class KeypadFunction {
    constructor(public display: string, public value: KeypadFunctionType) { }
}

export enum KeypadFunctionType {
    Invalid = 'invalid',
    Add = 'add',
    Subtract = 'subtract',
    Multiply = 'multiply',
    Divide = 'divide',
    Equals = 'equals',
    Clear = 'clear'
}