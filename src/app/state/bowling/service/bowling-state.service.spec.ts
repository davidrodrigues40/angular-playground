import { TestBed } from '@angular/core/testing';

import { BowlingStateService } from './bowling-state.service';

describe('BowlingStateService', () => {
  let service: BowlingStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BowlingStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
