import { TestBed } from '@angular/core/testing';

import { HomeMenuSignalService } from './home-menu-signal.service';

describe('HomeMenuSignalService', () =>
{
   let service: HomeMenuSignalService;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({});
      service = TestBed.inject(HomeMenuSignalService);
   });

   it('should be created', () =>
   {
      expect(service).toBeTruthy();
   });
});
