import { TestBed } from '@angular/core/testing';

import { HomeMenuStateService } from './home-menu-state.service';

describe('HomeMenuStateService', () => {
  let service: HomeMenuStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeMenuStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
