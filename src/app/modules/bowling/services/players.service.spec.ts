import { TestBed } from '@angular/core/testing';

import { CacheService } from '../../../services/cache/cache.service';
import { BowlingState } from '../bowling.state';
import { Game } from '../models/game';
import { Player } from '../models/player';
import { PlayersService } from './players.service';

describe('PlayersService', () => {
   let service: PlayersService;
   let cacheService: jasmine.SpyObj<CacheService> = jasmine.createSpyObj('CacheService', ['getSession', 'setSession']);
   let defaultPlayers: ReadonlyArray<Player> = [
      { number: 1, name: 'test1', rating: 1 },
      { number: 2, name: 'test2', rating: 1 },
      { number: 3, name: 'test3', rating: 1 }
   ];

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [
            PlayersService,
            { provide: CacheService, useValue: cacheService }
         ]
      });
      service = TestBed.inject(PlayersService);
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });

   describe('when addPlayer invoked', () => {
      it('should add a player to the list', () => {
         const playerName = 'testPlayer';
         const playerRating = 1;
         const expectedPlayers = [...defaultPlayers, { number: 4, name: playerName, rating: playerRating }];
         BowlingState.players.set(defaultPlayers);
         BowlingState.players.set = jasmine.createSpy('set');

         service.addPlayer(playerName, playerRating);

         expect(BowlingState.players.set).toHaveBeenCalledWith(expectedPlayers);
      });
   });

   describe('when removePlayer invoked', () => {
      it('should remove a player from the list', () => {
         const playerNumber = 2;
         const expectedPlayers = [
            { number: 1, name: 'test1', rating: 1 },
            { number: 2, name: 'test3', rating: 1 }
         ];
         BowlingState.players.set(defaultPlayers);
         BowlingState.players.set = jasmine.createSpy('set');

         service.removePlayer(playerNumber);

         expect(BowlingState.players.set).toHaveBeenCalledWith(expectedPlayers);
      });
   });

   describe('when removeAllPlayers invoked', () => {
      it('should remove all players from the list', () => {
         BowlingState.players.set(defaultPlayers);
         BowlingState.players.set = jasmine.createSpy('set');

         service.removeAllPlayers();

         expect(BowlingState.players.set).toHaveBeenCalledWith([]);
      });
   });

   describe('when changePlayerRatings invoked', () => {
      it('should change the ratings of the players', () => {
         const newRating = 2;
         const playersToChange: ReadonlyArray<Player> = [{ number: 1, name: 'test1', rating: 1 }];
         const expectedPlayers = [{ number: 1, name: 'test1', rating: newRating }];
         const game: Game = { bowlers: [], winner: { name: 'me', score: 300 }, completed: true };
         BowlingState.players.set(defaultPlayers);
         BowlingState.game.set(game);

         BowlingState.players.set = jasmine.createSpy('set');
         BowlingState.game.set = jasmine.createSpy('set');

         service.changePlayerRatings(newRating, playersToChange);

         expect(BowlingState.players.set).toHaveBeenCalledWith(expectedPlayers);
         expect(BowlingState.game.set).toHaveBeenCalledWith({ ...game, bowlers: game.bowlers, winner: undefined, completed: false });
      });
   });
});