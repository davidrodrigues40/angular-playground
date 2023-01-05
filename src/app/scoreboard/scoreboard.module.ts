import { NgModule } from '@angular/core';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ScorecardComponent } from './components/scorecard/scorecard.component';
import { EnterScoreComponent } from './components/enter-score/enter-score.component';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from '../state/game/game.effects';

@NgModule({
  declarations: [ScoreboardComponent, ScorecardComponent, EnterScoreComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    EffectsModule.forFeature([GameEffects])
  ]
})
export class ScoreboardModule { }
