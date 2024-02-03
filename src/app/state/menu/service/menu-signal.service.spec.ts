import { TestBed } from '@angular/core/testing';

import { MenuSignalService } from './menu-signal.service';

describe('MenuSignalService', () => {
  let service: MenuSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
