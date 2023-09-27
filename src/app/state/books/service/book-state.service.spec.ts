import { TestBed } from '@angular/core/testing';

import { BookStateService } from './book-state.service';

describe('BookStateService', () => {
  let service: BookStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
