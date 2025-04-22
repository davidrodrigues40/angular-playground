import { TitleComponent } from 'src/app/components/title/title.component';
import { BowlService } from 'src/app/services/bowling/offline/bowl-service/bowl.service';
import { GameService } from 'src/app/services/bowling/offline/game/game.service';
import { OfflineRatingService } from 'src/app/services/bowling/offline/offline-rating/offline-rating.service';
import { ScoreCalculatorService } from 'src/app/services/bowling/offline/score-calculator/score-calculator.service';
import { BowlingService } from 'src/app/services/bowling/online/bowling/bowling.service';
import { RatingService } from 'src/app/services/bowling/online/rating/rating.service';
import { PlayersService } from 'src/app/services/players/players.service';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';

import { FrameComponent } from './components/frame/frame.component';
import { GameComponent } from './components/game/game.component';
import { PlayerRatingDialogComponent } from './components/player-rating-dialog/player-rating-dialog.component';
import { PlayerRatingComponent } from './components/player-rating/player-rating.component';
import { PlayerComponent } from './components/player/player.component';
import { BowlerComponent } from './components/scorecard/scorecard.component';
import { BowlingViewComponent } from './view/bowling-view.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { PlayerService } from 'src/app/services/bowling/offline/player/player.service';

@NgModule({
   declarations: [
      BowlingViewComponent,
      BowlerComponent,
      PlayerComponent,
      GameComponent,
      FrameComponent,
      AddPlayerComponent,
      PlayerRatingComponent,
      PlayerRatingDialogComponent
   ],
   imports: [
      CommonModule,
      TitleComponent,
      FormsModule,
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatSelectModule,
      MatInputModule,
      MatDialogModule,
      MatSlideToggleModule,
      MatChipsModule,
   ],
   providers: [
      BowlingService,
      BowlService,
      GameService,
      ScoreCalculatorService,
      PlayerService,
      RatingService,
      OfflineRatingService,
      PlayersService
   ],
   exports: [
      BowlingViewComponent
   ]
})
export class BowlingModule { }
