import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { ChuckNorrisFactsService } from './chuck-norris-facts.service';

describe('ChuckNorrisFactsService', () => {
  let service: ChuckNorrisFactsService;
  let httpClient: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChuckNorrisFactsService,
        { provide: HttpClient, useValue: httpClient }
      ]
    });
    service = TestBed.inject(ChuckNorrisFactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
