import { TestBed } from '@angular/core/testing';

import { ChuckNorrisSignalService } from './chuck-norris-signal.service';

describe('ChuckNorrisSignalService', () => {
  let service: ChuckNorrisSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChuckNorrisSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
