import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BowlingViewComponent } from './bowling-view.component';
import { PlayersService } from 'src/app/modules/bowling/services/players.service';
import { PlayerRatingComponent } from '../components/player-rating/player-rating.component';
import { BowlingServiceAbstract } from 'src/app/modules/bowling/services/bowling-service.abstract';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { of } from 'rxjs';
import { MockComponent } from 'src/app/testing/testing.directive';
import { BowlingState } from '../bowling.state';
import { Player } from '../models/player';
import { PlayerService } from '../services/offline/player/player.service';
import { BowlingService } from '../services/online/bowling/bowling.service';
import { bowlingServiceProvider } from '../services/bowling-service-factory';
import { PlayerRatingDialogComponent } from '../components/player-rating-dialog/player-rating-dialog.component';

describe('BowlingViewComponent', () => {
   let component: BowlingViewComponent;
   let fixture: ComponentFixture<BowlingViewComponent>;
   let bowlingService: jasmine.SpyObj<BowlingService> = jasmine.createSpyObj('BowlingService', ['bowl', 'getRatings']);
   let playersService: jasmine.SpyObj<PlayersService> = jasmine.createSpyObj('PlayersService', ['addPlayer', 'removePlayer', 'removeAllPlayers', 'changePlayerRatings']);
   let playerService: jasmine.SpyObj<PlayersService> = jasmine.createSpyObj('PlayerService', ['generateBowlers']);
   let dialog: jasmine.SpyObj<MatDialog> = jasmine.createSpyObj('MatDialog', ['open']);

   let bowlingStatePlayers: jasmine.Spy;
   let bowlingStateSetGame: jasmine.Spy;
   let bowlingStateStatusSet: jasmine.Spy;
   let bowlStateRatings: jasmine.Spy;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [
            FormsModule,
            MatSlideToggleModule,
            MockComponent({ selector: 'app-title', standalone: true, inputs: ['title'] }),
            MockComponent({
               selector: 'app-game', template: '',
               inputs: [
                  'game',
                  'ratings',
                  'players',
                  'disablePlayGame'],
            }),
            MockComponent({
               selector: 'app-add-player', template: '',
               inputs: ['ratings']
            }),
         ],
         providers: [
            BowlingViewComponent,
            { provide: PlayerService, useValue: playerService },
            { provide: BowlingServiceAbstract, useValue: bowlingService },
         ],
      })
         .overrideComponent(BowlingViewComponent, {
            set: {
               providers: [
                  { provide: PlayersService, useValue: playersService },
                  { provide: MatDialog, useValue: dialog },
                  {
                     provide: bowlingServiceProvider, useValue: {
                        provide: BowlingServiceAbstract,
                        useFactory: () => bowlingService,
                        deps: []
                     }
                  }],
            }
         })
         .compileComponents();

      TestBed.inject(PlayerService);
      TestBed.inject(BowlingServiceAbstract);
      TestBed.inject(MatDialog);

      fixture = TestBed.createComponent(BowlingViewComponent);
      component = fixture.componentInstance;

      jasmine.getEnv().allowRespy(true);

      bowlingStatePlayers = spyOn(BowlingState, 'players');
      bowlingStateSetGame = spyOn(BowlingState.game, 'set');
      bowlStateRatings = spyOn(BowlingState, 'ratings');
      bowlingStateStatusSet = spyOn(BowlingState.status, 'set');

      dialog.open.calls.reset();

      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should load ratings on init', () => {
      component.ngOnInit();
      expect(bowlingService.getRatings).toHaveBeenCalled();
   });

   describe('when add player invoked', () => {
      it('should call player service addPlayer', () => {
         const player = { name: 'John Doe', rating: 150 };

         component.addPlayer(player);

         expect(playersService.addPlayer).toHaveBeenCalledWith(player.name, player.rating);
      });
   });

   describe('when remove player invoked', () => {
      it('should call player service removePlayer', () => {
         const playerNumber = 1;

         component.removePlayer(playerNumber);

         expect(playersService.removePlayer).toHaveBeenCalledWith(playerNumber);
      });
   });

   describe('when play game invoked', () => {
      it('should call bowling service bowl', () => {
         const players = [{ name: 'John Doe', rating: 150 }];
         bowlingStatePlayers.and.returnValue([players]);

         component.playGame();

         expect(bowlingService.bowl).toHaveBeenCalled();
      });
   });

   describe('when new game invoked', () => {
      it('should call player service removeAllPlayers', () => {
         component.newGame();

         expect(playersService.removeAllPlayers).toHaveBeenCalled();
         expect(bowlingStateSetGame).toHaveBeenCalledWith({ bowlers: [], completed: false, winner: undefined });
      });
   });

   describe('when change player ratings invoked', () => {
      it('should open dialog', waitForAsync(() => {
         const ratings = [{ key: 'beginner', value: 0 }, { key: 'intermediate', value: 1 }, { key: 'advanced', value: 2 }];
         const dialogRef: jasmine.SpyObj<MatDialogRef<PlayerRatingComponent>> = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
         const players: ReadonlyArray<Player> = [{ number: 1, name: 'John Doe', rating: 1 }];
         bowlingStatePlayers.and.returnValue(players);
         bowlStateRatings.and.returnValue(ratings);

         dialog.open.and.returnValue(dialogRef);

         dialogRef.afterClosed.and.returnValue(of(1));

         component.changePlayerRatings();

         expect(dialog.open).toHaveBeenCalledWith(PlayerRatingDialogComponent, { data: { ratings } });
         expect(playersService.changePlayerRatings).toHaveBeenCalledWith(1, players);
      }));
   });

   describe('when toggle status invoked', () => {
      it('should set status to online', () => {
         component.toggleStatus();

         expect(bowlingStateStatusSet).toHaveBeenCalledWith('online');
         expect(component.isChecked).toBeTrue();
      });

      it('should set status to offline', () => {
         component.isChecked = true;

         component.toggleStatus();

         expect(bowlingStateStatusSet).toHaveBeenCalledWith('offline');
         expect(component.isChecked).toBeFalse();
      });
   });
});
