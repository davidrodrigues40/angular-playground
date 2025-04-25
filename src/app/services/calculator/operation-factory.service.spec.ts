import { TestBed } from '@angular/core/testing';

import { OperationFactory } from './operation-factory.service';
import { KeypadFunctionType } from 'src/app/modules/calculator/models/keypad-function';
import { AddHandler } from './add-handler.service';
import { SubtractionHandler } from './subtraction-handler.service';
import { MultiplicationHandler } from './multiplication-handler.service';
import { DivisionHandler } from './division-handler.service';

describe('OperationFactoryService', () => {
  let service: OperationFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OperationFactory],
    });
    service = TestBed.inject(OperationFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createOperationHandler', () => {
    it('should return the correct handler for each operation type', () => {
      const types: KeypadFunctionType[] = [
        KeypadFunctionType.Add,
        KeypadFunctionType.Subtract,
        KeypadFunctionType.Multiply,
        KeypadFunctionType.Divide,
        KeypadFunctionType.Equals,
        KeypadFunctionType.Clear,
      ];

      types.forEach(element => {
        const response = service.createOperationHandler(element);

        switch (element) {
          case KeypadFunctionType.Add:
            expect(response).toBeInstanceOf(AddHandler);
            break;
          case KeypadFunctionType.Subtract:
            expect(response).toBeInstanceOf(SubtractionHandler);
            break;
          case KeypadFunctionType.Multiply:
            expect(response).toBeInstanceOf(MultiplicationHandler);
            break;
          case KeypadFunctionType.Divide:
            expect(response).toBeInstanceOf(DivisionHandler);
            break;
          case KeypadFunctionType.Equals:
            expect(response).not.toBeTruthy();
            break;
          case KeypadFunctionType.Clear:
            expect(response).not.toBeTruthy();
            break;
        }
      });

    });

    it('should return undefined for an unknown operation type', () => {
      const unknownHandler = service.createOperationHandler('Unknown' as any);
      expect(unknownHandler).toBeUndefined();
    });
  });
});
