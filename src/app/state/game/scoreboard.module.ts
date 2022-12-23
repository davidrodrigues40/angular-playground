import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { scoreboardFeatureKey, scoreboardReducer } from './scoreboard.reduce';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(scoreboardFeatureKey, scoreboardReducer)
  ]
})
export class ScoreboardModule { }
