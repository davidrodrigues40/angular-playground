import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EffectsModule } from '@ngrx/effects';
import { BowlingEffects } from 'src/app/state/bowling/bowling.effects';
import { BowlingService } from 'src/app/state/bowling/services/bowling.service';
import { BowlComponent } from './components/bowl/bowl.component';
import { BowlerComponent } from './components/bowler/bowler.component';
import { PlayerComponent } from './components/player/player.component';



@NgModule({
  declarations: [
    BowlComponent,
    BowlerComponent,
    PlayerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    EffectsModule.forFeature([BowlingEffects]),
  ],
  providers: [BowlingService],
  exports: [
    BowlComponent
  ]
})
export class BowlingModule { }
