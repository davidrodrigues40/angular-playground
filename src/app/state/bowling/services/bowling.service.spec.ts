import { TestBed } from '@angular/core/testing';

import { BowlingService } from './bowling.service';

describe('BowlingService', () => {
  let service: BowlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BowlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
