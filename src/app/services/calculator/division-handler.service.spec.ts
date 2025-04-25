import { TestBed } from '@angular/core/testing';

import { DivisionHandler } from './division-handler.service';

describe('DivisionHandlerService', () => {
  let service: DivisionHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DivisionHandler],
    });
    service = TestBed.inject(DivisionHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when handling division', () => {
    it('should return the result of division', () => {
      const result = service.handle(10, 2);
      expect(result).toBe(5);
    });

    it('should throw an error when dividing by zero', () => {
      expect(() => service.handle(10, 0)).toThrowError('Division by zero is not allowed');
    });
  });
});
