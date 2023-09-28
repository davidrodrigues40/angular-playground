import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BowlingService } from './bowling.service';

describe('BowlingService', () => {
  let service: BowlingService;
  let httpClient: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BowlingService,
        { provide: HttpClient, useValue: httpClient }
      ]
    });
    service = TestBed.inject(BowlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
