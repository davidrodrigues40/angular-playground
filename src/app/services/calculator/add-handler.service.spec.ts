import { TestBed } from '@angular/core/testing';

import { AddHandler } from './add-handler.service';

describe('AddHandlerService', () => {
  let service: AddHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddHandler],
    });
    service = TestBed.inject(AddHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
