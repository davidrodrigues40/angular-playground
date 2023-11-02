import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';
import { BowlingGame } from 'src/app/state/bowling/models/bowling-game.model';
import { Player } from 'src/app/state/bowling/models/player.model';
import { BowlingService } from './bowling.service';

describe('BowlingService', () => {
  let service: BowlingService;
  let httpClient: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const defaultGame: BowlingGame = {
    bowlers: [],
    winner: {
      name: '',
      score: 0
    }
  };
  const defaultRating: BowlerRating = {
    key: 0,
    value: ''
  };
  const defaultPlayers: Player[] = [];
  const defaultRatings: BowlerRating[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BowlingService,
        { provide: HttpClient, useValue: httpClient }
      ]
    });
    service = TestBed.inject(BowlingService);

    httpClient.get.calls.reset();
    httpClient.post.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when bowl$ invoked', () => {
    it('should call httpClient.post and return score', () => {
      httpClient.post.and.returnValue(of(defaultGame));

      service.bowl$(defaultPlayers)
        .subscribe((game) => {
          expect(game).toEqual(defaultGame);
        });
    });
  });

  describe('when getRatings$ invoked', () => {
    it('should call httpClient.get and return ratings', () => {
      httpClient.get.and.returnValue(of(defaultRatings));

      service.getRatings$()
        .subscribe((ratings) => {
          expect(ratings).toEqual(defaultRatings);
        });
    });

    it('should return cached', () => {
      Object.defineProperty(service, '_ratings', { value: defaultRatings });

      service.getRatings$()
        .subscribe((ratings) => {
          expect(ratings).toEqual(defaultRatings);
        });
    });
  });

  describe('when getRating$ invoked', () => {
    it('should call httpClient.get and return rating', () => {
      const ratings = [{ ...defaultRating, key: 1 }];
      httpClient.get.and.returnValue(of(ratings));

      service.getRating$(1)
        .subscribe((rating) => {
          expect(rating).toEqual(ratings[0]);
        });
    });

    it('should return cached', () => {
      const ratings = [{ ...defaultRating, key: 1 }];
      Object.defineProperty(service, '_ratings', { value: ratings });

      service.getRating$(1)
        .subscribe((rating) => {
          expect(rating).toEqual(ratings[0]);
        });
    });
  });
});
