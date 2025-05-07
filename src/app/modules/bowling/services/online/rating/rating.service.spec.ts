import { StorageTranscoders } from 'ngx-webstorage-service';
import { of } from 'rxjs';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';
import { CacheService } from 'src/app/services/cache/cache.service';

import { HttpClient } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { RatingService } from './rating.service';

describe('RatingService', () =>
{
   let service: RatingService;
   let httpClient: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);
   let cacheService: jasmine.SpyObj<CacheService> = jasmine.createSpyObj('CacheService', ['localHas', 'getLocal', 'setLocal']);

   const rating: BowlerRating = {
      key: 0,
      value: 'Bad'
   };

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         providers: [
            RatingService,
            { provide: HttpClient, useValue: httpClient },
            { provide: CacheService, useValue: cacheService }
         ]
      });
      service = TestBed.inject(RatingService);

      httpClient.get.calls.reset();
      cacheService.localHas.calls.reset();
      cacheService.getLocal.calls.reset();
      cacheService.setLocal.calls.reset();
   });

   it('should be created', () =>
   {
      expect(service).toBeTruthy();
   });

   describe('when getRating invoked', () =>
   {
      it('should get from httpClient', waitForAsync(() =>
      {
         const myRating: BowlerRating = { ...rating, key: 1, value: 'Good' };
         cacheService.localHas.and.returnValue(false);
         httpClient.get.and.returnValue(of([myRating]));

         service.getRatings$()
            .subscribe(actual =>
            {
               expect(cacheService.setLocal).toHaveBeenCalledOnceWith(service['_ratingsCacheKey'], [myRating], StorageTranscoders.JSON);
               expect(httpClient.get).toHaveBeenCalled();
               expect(actual).toEqual([myRating]);
            });
      }));

      it('should get from cacheService', waitForAsync(() =>
      {
         const myRating: BowlerRating = { ...rating, key: 2, value: 'Excellent' };
         cacheService.localHas.and.returnValue(true);
         cacheService.getLocal.and.returnValue([myRating]);

         service.getRatings$()
            .subscribe(actual =>
            {
               expect(cacheService.setLocal).not.toHaveBeenCalled();
               expect(httpClient.get).not.toHaveBeenCalled();
               expect(actual).toEqual([myRating]);
            });
      }));
   });
});
