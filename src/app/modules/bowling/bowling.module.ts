import { TitleComponent } from 'src/app/components/title/title.component';
import { BowlService } from 'src/app/services/bowling/offline/bowl-service/bowl.service';
import { GameService } from 'src/app/services/bowling/offline/game/game.service';
import { OfflineBowlingService } from 'src/app/services/bowling/offline/offline-bowling.service';
import { OfflineRatingService } from 'src/app/services/bowling/offline/offline-rating/offline-rating.service';
import { ScoreCalculatorService } from 'src/app/services/bowling/offline/score-calculator/score-calculator.service';
import { BowlingService } from 'src/app/services/bowling/online/bowling/bowling.service';
import { RatingService } from 'src/app/services/bowling/online/rating/rating.service';
import { PlayersService } from 'src/app/services/players/players.service';
import { BowlingEffects } from 'src/app/state/bowling/bowling.effects';
import { BowlingStateService } from 'src/app/state/bowling/service/bowling-state.service';

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
import { EffectsModule } from '@ngrx/effects';

import { AddPlayerComponent } from './components/add-player/add-player.component';
import { FrameComponent } from './components/frame/frame.component';
import { GameComponent } from './components/game/game.component';
import { PlayerRatingDialogComponent } from './components/player-rating-dialog/player-rating-dialog.component';
import { PlayerRatingComponent } from './components/player-rating/player-rating.component';
import { PlayerComponent } from './components/player/player.component';
import { BowlerComponent } from './components/scorecard/scorecard.component';
import { BowlingViewComponent } from './view/bowling-view.component';

@NgModule({
   declarations: [
      BowlingViewComponent,
      BowlerComponent,
      PlayerComponent,
      AddPlayerComponent,
      GameComponent,
      FrameComponent,
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
      EffectsModule.forFeature([BowlingEffects]),
   ],
   providers: [
      BowlingService,
      BowlService,
      OfflineBowlingService,
      GameService,
      ScoreCalculatorService,
      BowlingStateService,
      RatingService,
      OfflineRatingService,
      PlayersService
   ],
   exports: [
      BowlingViewComponent
   ]
})
export class BowlingModule { }
