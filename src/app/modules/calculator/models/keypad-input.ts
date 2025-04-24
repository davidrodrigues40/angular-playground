import { KeypadFunction } from "./keypad-function";

export class KeypadInput {
    constructor(public display: string, public value: number | KeypadFunction | undefined) { }
}