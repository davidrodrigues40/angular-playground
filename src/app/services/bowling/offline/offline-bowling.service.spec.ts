import { Bowler } from 'src/app/interfaces/models/bowling/bowler';
import { Frame } from 'src/app/interfaces/models/bowling/frame';
import { Game } from 'src/app/interfaces/models/bowling/game';
import { Player } from 'src/app/interfaces/models/bowling/player';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';

import { TestBed, waitForAsync } from '@angular/core/testing';

import { CacheService } from '../../cache/cache.service';
import { GameService } from './game/game.service';
import { OfflineBowlingService } from './offline-bowling.service';
import { PlayerService } from './player/player.service';

describe('OfflineBowlingService', () =>
{
   let service: OfflineBowlingService;
   const playerService: jasmine.SpyObj<PlayerService> = jasmine.createSpyObj('PlayerService', ['generateBowlers']);
   const gameService: jasmine.SpyObj<GameService> = jasmine.createSpyObj('GameService', ['newGame', 'playGame']);
   const cacheService: jasmine.SpyObj<CacheService> = jasmine.createSpyObj('CacheService', ['localHas', 'getLocal', 'setLocal']);

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

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         providers: [
            OfflineBowlingService,
            { provide: PlayerService, useValue: playerService },
            { provide: GameService, useValue: gameService },
            { provide: CacheService, useValue: cacheService }
         ]
      });
      service = TestBed.inject(OfflineBowlingService);
   });

   it('should be created', () =>
   {
      expect(service).toBeTruthy();
   });

   describe('when bowl$ invoked', () =>
   {
      it('should return a game', waitForAsync(() =>
      {
         // Arrange
         const players = [{ ...player, name: 'Test Player', rating: 0 }];
         const bowlers = [{ ...bowler, name: 'Test Player', rating: 0 }];
         const newGame: Game = { ...game, bowlers: [bowler], winner: undefined };

         playerService.generateBowlers.and.returnValue(bowlers);
         gameService.newGame.and.returnValue(newGame);
         gameService.playGame.and.returnValue(newGame);

         // Act & Assert
         service.bowl$(players).subscribe(g =>
         {
            expect(g).toEqual(newGame);
         });
      }));

      it('should return an error', waitForAsync(() =>
      {
         // Act & Assert
         service.bowl$([]).subscribe({
            error: (err) =>
            {
               expect(err).toEqual(new Error('No players provided'));
            }
         });
      }));
   });

   describe('when getRatings$ invoked', () =>
   {
      it('should return ratings from cache', waitForAsync(() =>
      {
         // Arrange
         cacheService.localHas.and.returnValue(true);
         cacheService.getLocal.and.returnValue(ratings);

         // Act & Assert
         service.getRatings$().subscribe(r =>
         {
            expect(r).toEqual(ratings);
         });
      }));

      it('should return ratings from list', waitForAsync(() =>
      {
         // Arrange
         cacheService.localHas.and.returnValue(false);
         cacheService.setLocal.and.returnValue(undefined);
         spyOnProperty<any>(service, 'ratings').and.returnValue(ratings);

         // Act & Assert
         service.getRatings$().subscribe(r =>
         {
            expect(r).toEqual(ratings);
         });
      }));
   });

   describe('when getRating invoked', () =>
   {
      it('should return rating', () =>
      {
         // Act & Assert
         expect(service.getRating(0)).toEqual(service['ratings'][0]);
      });
   });
});
