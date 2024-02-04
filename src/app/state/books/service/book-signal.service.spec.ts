import { TestBed } from '@angular/core/testing';

import { BookSignalService } from './book-signal.service';

describe('BookSignalService', () => {
  let service: BookSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
