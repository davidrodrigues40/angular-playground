import { Game } from 'src/app/interfaces/models/bowling/game';
import { Player } from 'src/app/interfaces/models/bowling/player';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RatingService } from '../rating/rating.service';
import { BowlingService } from './bowling.service';

describe('BowlingService', () => {
   let service: BowlingService;
   let httpClient: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get', 'post']);
   let ratingService: jasmine.SpyObj<RatingService> = jasmine.createSpyObj('RatingService', ['getRatings$']);

   const defaultGame: Game = {
      bowlers: [],
      winner: {
         name: '',
         score: 0
      }
   };
   const defaultPlayers: Player[] = [];
   const defaultRatings: BowlerRating[] = [];

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [
            BowlingService,
            { provide: HttpClient, useValue: httpClient },
            { provide: RatingService, useValue: ratingService },
         ]
      });
      service = TestBed.inject(BowlingService);

      httpClient.post.calls.reset();
      ratingService.getRatings$.calls.reset();
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });
});
