import { TestBed } from '@angular/core/testing';
import { StorageTranscoders } from 'ngx-webstorage-service';
import { Player } from 'src/app/state/bowling/models/player.model';
import { CacheService } from '../cache/cache.service';
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

  describe('when getPlayers$ invoked', () => {
    it('should return players from cache', () => {
      const players = [...defaultPlayers];
      cacheService.getSession.and.returnValue(players);

      service.getPlayers$()
        .subscribe((result) => {
          expect(result).toEqual(players);
          expect(cacheService.getSession).toHaveBeenCalledWith('players', StorageTranscoders.JSON);
        });
    });

    it('should return empty array', () => {
      cacheService.getSession.and.returnValue(undefined);

      service.getPlayers$()
        .subscribe((result) => {
          expect(result).toEqual([]);
          expect(cacheService.getSession).toHaveBeenCalledWith('players', StorageTranscoders.JSON);
        });
    });
  });

  describe('when addPlayer$ invoked', () => {
    it('should return new array with player', () => {
      const players = [...defaultPlayers];
      const newPlayer = { number: 4, name: 'testnew', rating: 1 };

      service.addPlayer$(newPlayer.name, newPlayer.rating, players)
        .subscribe((newPlayers) => {
          expect(newPlayers).toEqual([...players, newPlayer]);
          expect(cacheService.setSession).toHaveBeenCalledWith('players', [...players, newPlayer], StorageTranscoders.JSON);
        });
    });
  });

  describe('when removePlayer$ invoked', () => {
    it('should return new array without player', () => {
      const players = [...defaultPlayers];
      const expected = [{ number: 1, name: 'test2', rating: 1 }, { number: 2, name: 'test3', rating: 1 }];
      const playerToRemove = 1;

      service.removePlayer$(playerToRemove, players)
        .subscribe((newPlayers) => {
          expect(newPlayers).toEqual(expected);
          expect(cacheService.setSession).toHaveBeenCalledWith('players', expected, StorageTranscoders.JSON);
        });
    });
  });

  describe('when removeAllPlayers$ invoked', () => {
    it('should return empty array', () => {
      service.removeAllPlayers$()
        .subscribe((newPlayers) => {
          expect(newPlayers).toEqual([]);
          expect(cacheService.setSession).toHaveBeenCalledWith('players', [], StorageTranscoders.JSON);
        });
    });
  });

  describe('when changePlayerRatings$ invoked', () => {
    it('should return new array with updated players', () => {
      const players = [...defaultPlayers];
      const rating = 3;

      service.changePlayerRatings$(rating, players)
        .subscribe((newPlayers) => {
          expect(newPlayers.filter(f => f.rating === 3)).toHaveSize(defaultPlayers.length);
          expect(cacheService.setSession).toHaveBeenCalledWith('players', newPlayers, StorageTranscoders.JSON);
        });
    });
  });
});
