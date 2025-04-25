import { TestBed } from '@angular/core/testing';

import { SubtractionHandler } from './subtraction-handler.service';

describe('SubtractionHandlerService', () => {
  let service: SubtractionHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubtractionHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
