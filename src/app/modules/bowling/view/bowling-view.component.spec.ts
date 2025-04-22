import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BowlingViewComponent } from './bowling-view.component';
import { PlayersService } from 'src/app/services/players/players.service';
import { AddPlayerComponent } from '../components/add-player/add-player.component';
import { GameComponent } from '../components/game/game.component';
import { PlayerRatingComponent } from '../components/player-rating/player-rating.component';
import { BowlingServiceAbstract } from 'src/app/services/bowling/bowling-service.abstract';
import { BowlingState } from 'src/app/state/bowling.state';
import { PlayerService } from 'src/app/services/bowling/offline/player/player.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitleComponent } from 'src/app/components/title/title.component';
import { of } from 'rxjs';
import { Player } from 'src/app/interfaces/models/bowling/player';
import { PlayerRatingDialogComponent } from '../components/player-rating-dialog/player-rating-dialog.component';
import { PlayerComponent } from '../components/player/player.component';

describe('BowlingViewComponent', () => {
   let component: BowlingViewComponent;
   let fixture: ComponentFixture<BowlingViewComponent>;
   let bowlingAbstractService: jasmine.SpyObj<BowlingServiceAbstract> = jasmine.createSpyObj('BowlingService', ['bowl', 'getRatings']);
   let playerService: jasmine.SpyObj<PlayersService> = jasmine.createSpyObj('PlayerService', ['addPlayer', 'removePlayer', 'removeAllPlayers', 'changePlayerRatings']);
   let dialog: jasmine.SpyObj<MatDialog> = jasmine.createSpyObj('MatDialog', ['open']);

   let bowlingStatePlayers: jasmine.Spy;
   let bowlingStateSetGame: jasmine.Spy;
   let bowlingStateStatusSet: jasmine.Spy;
   let bowlStateRatings: jasmine.Spy;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [
            BowlingViewComponent,
            AddPlayerComponent,
            GameComponent,
            PlayerRatingComponent,
            PlayerComponent,
         ],
         providers: [
            { provide: BowlingServiceAbstract, useValue: bowlingAbstractService },
            { provide: MatDialog, useValue: dialog },
            { provide: PlayersService, useValue: playerService },
         ],
         imports: [
            TitleComponent,
            MatSlideToggleModule,
            BrowserAnimationsModule,
            MatFormFieldModule,
            MatIconModule,
            MatSelectModule,
            FormsModule,
         ]
      })
         .overrideComponent(BowlingViewComponent, {
            set: {
               providers: [
                  { provide: BowlingServiceAbstract, useValue: bowlingAbstractService },
                  { provide: PlayerService, useValue: playerService },
               ]
            }
         })
         .compileComponents();

      fixture = TestBed.createComponent(BowlingViewComponent);

      component = fixture.componentInstance;
      fixture.detectChanges();

      jasmine.getEnv().allowRespy(true);

      bowlingStatePlayers = spyOn(BowlingState, 'players');
      bowlingStateSetGame = spyOn(BowlingState.game, 'set');
      bowlStateRatings = spyOn(BowlingState, 'ratings');
      bowlingStateStatusSet = spyOn(BowlingState.status, 'set');

      dialog.open.calls.reset();

      dialog.open.calls.reset();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   describe('when add player invoked', () => {
      it('should call player service addPlayer', () => {
         const player = { name: 'John Doe', rating: 150 };

         component.addPlayer(player);

         expect(playerService.addPlayer).toHaveBeenCalledWith(player.name, player.rating);
      });
   });

   describe('when remove player invoked', () => {
      it('should call player service removePlayer', () => {
         const playerNumber = 1;

         component.removePlayer(playerNumber);

         expect(playerService.removePlayer).toHaveBeenCalledWith(playerNumber);
      });
   });

   describe('when play game invoked', () => {
      it('should call bowling service bowl', () => {
         const players = [{ name: 'John Doe', rating: 150 }];
         bowlingStatePlayers.and.returnValue([players]);

         component.playGame();

         expect(bowlingAbstractService.bowl).toHaveBeenCalled();
      });
   });

   describe('when new game invoked', () => {
      it('should call player service removeAllPlayers', () => {
         component.newGame();

         expect(playerService.removeAllPlayers).toHaveBeenCalled();
         expect(bowlingStateSetGame).toHaveBeenCalledWith({ bowlers: [], completed: false, winner: undefined });
      });
   });

   describe('when change player ratings invoked', () => {
      it('should open dialog', waitForAsync(() => {
         const ratings = [{ key: 1, name: 'John Doe', rating: 150 }];
         const dialogRef: jasmine.SpyObj<MatDialogRef<PlayerRatingComponent>> = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
         const players: ReadonlyArray<Player> = [{ number: 1, name: 'John Doe', rating: 150 }];
         bowlingStatePlayers.and.returnValue(players);
         bowlStateRatings.and.returnValue(ratings);

         dialog.open.and.returnValue(dialogRef);

         dialogRef.afterClosed.and.returnValue(of(1));

         component.changePlayerRatings();

         expect(dialog.open).toHaveBeenCalledWith(PlayerRatingDialogComponent, { data: { ratings } });
         expect(playerService.changePlayerRatings).toHaveBeenCalledWith(1, players);
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
