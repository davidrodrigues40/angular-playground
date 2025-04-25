import { TestBed } from '@angular/core/testing';

import { MultiplicationHandler } from './multiplication-handler.service';

describe('MultiplicationHandlerService', () => {
  let service: MultiplicationHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiplicationHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
