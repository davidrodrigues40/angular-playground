import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EffectsModule } from '@ngrx/effects';
import { BowlingService } from 'src/app/services/bowling/bowling.service';
import { BowlingEffects } from 'src/app/state/bowling/bowling.effects';
import { BowlingStateService } from 'src/app/state/bowling/services/bowling-state.service';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { FrameComponent } from './components/frame/frame.component';
import { GameComponent } from './components/game/game.component';
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
    FrameComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    EffectsModule.forFeature([BowlingEffects]),
  ],
  providers: [
    BowlingService,
    BowlingStateService],
  exports: [
    BowlingViewComponent
  ]
})
export class BowlingModule { }