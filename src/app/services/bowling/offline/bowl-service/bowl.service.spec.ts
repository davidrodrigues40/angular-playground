import { TestBed } from '@angular/core/testing';

import { BowlService } from './bowl.service';

describe('BowlService', () =>
{
   let service: BowlService;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({});
      service = TestBed.inject(BowlService);
   });

   it('should be created', () =>
   {
      expect(service).toBeTruthy();
   });

   describe('when rollFirstBall', () =>
   {
      it('should return a number', () =>
      {
         expect(service.rollFirstBall({ key: 1, value: 'any' })).toEqual(jasmine.any(Number));
      });
   });

   describe('when rollSecondBall', () =>
   {
      it('should return a number', () =>
      {
         expect(service.rollSecondBall({ key: 1, value: 'any' }, 5)).toEqual(jasmine.any(Number));
      });
   });
});
