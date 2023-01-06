import { TestBed } from '@angular/core/testing';

import { ChuckNorrisFactsService } from './chuck-norris-facts.service';

describe('ChuckNorrisFactsService', () => {
  let service: ChuckNorrisFactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChuckNorrisFactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
