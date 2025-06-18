import { TestBed } from '@angular/core/testing';

import { PlayerService } from './player.service';
import { Player } from '../../../models/player';

describe('PlayerService', () => {
   let service: PlayerService;
   const player: Player = {
      number: 0,
      name: '',
      rating: 0
   };

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [PlayerService]
      });
      service = TestBed.inject(PlayerService);
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });

   describe('when generateBowlers invoked', () => {
      it('should return an array of bowlers', () => {
         const players: ReadonlyArray<Player> = [
            { ...player, name: 'Test Player 1', rating: 0 },
            { ...player, name: 'Test Player 2', rating: 0 }
         ];

         const bowlers = service.generateBowlers(players);

         expect(bowlers.length).toBe(2);
      });
   });
});
