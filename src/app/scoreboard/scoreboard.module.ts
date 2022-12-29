import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { scoreboardFeatureKey, scoreboardReducer } from '../state/game/scoreboard.reduce';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ScorecardComponent } from './components/scorecard/scorecard.component';

@NgModule({
  declarations: [ScoreboardComponent, ScorecardComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    StoreModule.forFeature(scoreboardFeatureKey, scoreboardReducer)
  ]
})
export class ScoreboardModule { }
