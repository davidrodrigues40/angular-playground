import { TestBed } from '@angular/core/testing';

import { HomeMenuService } from './home-menu.service';

describe('HomeMenuService', () => {
  let service: HomeMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
