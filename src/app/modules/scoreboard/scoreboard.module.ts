import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from '../../state/game/game.effects';
import { EnterScoreComponent } from './components/enter-score/enter-score.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { ScorecardComponent } from './components/scorecard/scorecard.component';

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
