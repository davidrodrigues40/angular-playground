import { TestBed } from '@angular/core/testing';

import { DivisionHandler } from './division-handler.service';

describe('DivisionHandlerService', () => {
  let service: DivisionHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DivisionHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
