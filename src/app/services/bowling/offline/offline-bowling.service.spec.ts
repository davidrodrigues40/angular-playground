import { Bowler } from 'src/app/interfaces/models/bowling/bowler';
import { Frame } from 'src/app/interfaces/models/bowling/frame';
import { Game } from 'src/app/interfaces/models/bowling/game';
import { Player } from 'src/app/interfaces/models/bowling/player';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { TestBed } from '@angular/core/testing';

import { GameService } from './game/game.service';
import { OfflineBowlingService } from './offline-bowling.service';
import { OfflineRatingService } from './offline-rating/offline-rating.service';
import { PlayerService } from './player/player.service';

describe('OfflineBowlingService', () => {
   let service: OfflineBowlingService;
   const playerService: jasmine.SpyObj<PlayerService> = jasmine.createSpyObj('PlayerService', ['generateBowlers']);
   const gameService: jasmine.SpyObj<GameService> = jasmine.createSpyObj('GameService', ['newGame', 'playGame']);
   const ratingService: jasmine.SpyObj<OfflineRatingService> = jasmine.createSpyObj('OfflineBowlingService', ['bowl$', 'getRatings$']);

   const rating: BowlerRating = {
      key: 0,
      value: 'Beginner'
   };
   const ratings: Array<BowlerRating> = [rating];

   const player: Player = {
      number: 0,
      name: '',
      rating: 0
   };

   const bowler: Bowler = {
      frames: new Map<number, Frame>(),
      score: 0,
      number: 0,
      name: '',
      rating: 0
   }

   const game: Game = {
      bowlers: [],
      winner: undefined
   };

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [
            OfflineBowlingService,
            { provide: PlayerService, useValue: playerService },
            { provide: GameService, useValue: gameService },
            { provide: OfflineRatingService, useValue: ratingService }
         ]
      });

      service = TestBed.inject(OfflineBowlingService);
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });
});
