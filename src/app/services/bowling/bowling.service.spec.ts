import { of } from 'rxjs';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';
import { BowlingGame } from 'src/app/state/bowling/models/bowling-game.model';
import { Player } from 'src/app/state/bowling/models/player.model';

import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CacheService } from '../cache/cache.service';
import { BowlingService } from './bowling.service';

describe('BowlingService', () =>
{
   let service: BowlingService;
   let httpClient: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get', 'post']);
   let cacheService: jasmine.SpyObj<CacheService> = jasmine.createSpyObj('CacheService', ['getLocal', 'localHas', 'setLocal']);

   const defaultGame: BowlingGame = {
      bowlers: [],
      winner: {
         name: '',
         score: 0
      }
   };
   const defaultPlayers: Player[] = [];
   const defaultRatings: BowlerRating[] = [];

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         providers: [
            BowlingService,
            { provide: HttpClient, useValue: httpClient },
            { provide: CacheService, useValue: cacheService }
         ]
      });
      service = TestBed.inject(BowlingService);

      httpClient.get.calls.reset();
      httpClient.post.calls.reset();
      cacheService.getLocal.calls.reset();
      cacheService.localHas.calls.reset();
      cacheService.setLocal.calls.reset();
   });

   it('should be created', () =>
   {
      expect(service).toBeTruthy();
   });

   describe('when bowl$ invoked', () =>
   {
      it('should call httpClient.post and return score', () =>
      {
         httpClient.post.and.returnValue(of(defaultGame));

         service.bowl$(defaultPlayers)
            .subscribe((game) =>
            {
               expect(game).toEqual(defaultGame);
            });
      });
   });

   describe('when getRatings$ invoked', () =>
   {
      it('should call httpClient.get and return ratings', () =>
      {
         httpClient.get.and.returnValue(of(defaultRatings));
         cacheService.localHas.and.returnValue(false);

         service.getRatings$()
            .subscribe((ratings) =>
            {
               expect(ratings).toEqual(defaultRatings);
            });
      });

      it('should return cached', () =>
      {
         cacheService.localHas.and.returnValue(true);
         cacheService.getLocal.and.returnValue(defaultRatings);

         service.getRatings$()
            .subscribe((ratings) =>
            {
               expect(ratings).toEqual(defaultRatings);
            });
      });
   });
});
