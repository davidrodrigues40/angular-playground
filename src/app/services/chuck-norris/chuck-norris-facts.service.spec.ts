import { isEmpty, of } from 'rxjs';
import { ChuckNorrisFact } from 'src/app/interfaces/models/chuck-norris/chuck-norris-fact';

import { HttpClient } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { ChuckNorrisFactsService } from './chuck-norris-facts.service';

describe('ChuckNorrisFactsService', () => {
   let service: ChuckNorrisFactsService;
   let httpClient: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);
   const defaultFact: ChuckNorrisFact = {
      icon_url: '',
      id: '',
      url: '',
      value: ''
   };

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [
            ChuckNorrisFactsService,
            { provide: HttpClient, useValue: httpClient }
         ]
      });
      service = TestBed.inject(ChuckNorrisFactsService);
      httpClient.get.calls.reset();
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });
});