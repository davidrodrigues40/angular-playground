import { TestBed } from '@angular/core/testing';

import { FrameService } from './frame.service';

describe('FrameService', () => {
  let service: FrameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FrameService]
    });
    service = TestBed.inject(FrameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
