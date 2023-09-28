import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;
  let httpClient: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MenuService,
        { provide: HttpClient, useValue: httpClient }
      ]
    });
    service = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
