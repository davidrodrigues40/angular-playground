import { MockComponent } from 'src/app/testing/testing.directive';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { BowlingViewComponent } from './bowling-view.component';
import { BowlingService } from 'src/app/services/bowling/bowling-service.interface';
import { OfflineRatingService } from 'src/app/services/bowling/offline/offline-rating/offline-rating.service';
import { GameService } from 'src/app/services/bowling/offline/game/game.service';
import { ScoreCalculatorService } from 'src/app/services/bowling/offline/score-calculator/score-calculator.service';
import { BowlService } from 'src/app/services/bowling/offline/bowl-service/bowl.service';
import { PlayersService } from 'src/app/services/players/players.service';

describe('BowlingViewComponent', () => {
   let component: BowlingViewComponent;
   let fixture: ComponentFixture<BowlingViewComponent>;
   let bowlingService: jasmine.SpyObj<BowlingService> = jasmine.createSpyObj('BowlingService', [], ['updateGame', 'updatePlayers', 'updateRatings']);
   let playerService: jasmine.SpyObj<PlayersService> = jasmine.createSpyObj('PlayerService', [], ['addPlayer', 'removePlayer', 'removeAllPlayers']);
   let offlineRatingService: jasmine.SpyObj<OfflineRatingService> = jasmine.createSpyObj('OfflineRatingService', [], ['getRatings']);
   let dialog: jasmine.SpyObj<MatDialog> = jasmine.createSpyObj('MatDialog', ['open']);

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [
            BowlingViewComponent
         ],
         providers: [
            GameService,
            ScoreCalculatorService,
            { provide: BowlService, useValue: bowlingService },
            { provide: MatDialog, useValue: dialog },
            { provide: PlayersService, useValue: playerService },
            { provide: OfflineRatingService, useValue: offlineRatingService }
         ],
         imports: [
            MatFormFieldModule,
            MatSelectModule,
            MatIconModule,
            MockComponent({ selector: 'app-add-player' }),
            MockComponent({ selector: 'app-title' }),
            MockComponent({ selector: 'app-game' }),
            MockComponent({ selector: 'mat-slide-toggle' })
         ]
      })
         .compileComponents();

      fixture = TestBed.createComponent(BowlingViewComponent);
      component = fixture.componentInstance;
      dialog.open.calls.reset();
   });

   it('should create', () => {

      expect(component).toBeTruthy();
   });
});
