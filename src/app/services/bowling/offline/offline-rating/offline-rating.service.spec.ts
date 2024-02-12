import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { TestBed, waitForAsync } from '@angular/core/testing';

import { OfflineRatingService } from './offline-rating.service';

describe('OfflineRatingService', () =>
{
   let service: OfflineRatingService;
   const rating: BowlerRating = {
      key: 0,
      value: ''
   }

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         providers: [OfflineRatingService]
      });
      service = TestBed.inject(OfflineRatingService);
   });

   it('should be created', () =>
   {
      expect(service).toBeTruthy();
   });

   describe('when getRating invoked', () =>
   {
      it('should return rating', () =>
      {
         // Arrange
         const expected: BowlerRating = { ...rating, key: 1, value: 'Intermediate' };

         // Act
         const actual = service.getRating(1);

         // Assert
         expect(actual).toEqual(expected);
      });
   });

   describe('when getRatings$ invoked', () =>
   {
      it('should return ratings', waitForAsync(() =>
      {
         // Act && Assert 
         service.getRatings$().subscribe(ratings =>
         {
            expect(ratings).toEqual(service.ratings);
         });
      }));
   });
});
