import { TestBed } from '@angular/core/testing';

import { ChuckNorrisStateService } from './chuck-norris-state.service';

describe('ChuckNorrisStateService', () => {
  let service: ChuckNorrisStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChuckNorrisStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
