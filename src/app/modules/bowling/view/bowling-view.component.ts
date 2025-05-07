import { Game } from 'src/app/interfaces/models/bowling/game';
import { Player } from 'src/app/interfaces/models/bowling/player';

import { Component, OnInit, WritableSignal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PlayerRatingDialogComponent } from '../components/player-rating-dialog/player-rating-dialog.component';
import { BowlerRating } from '../models/bowler-rating.model';
import { BowlingState } from 'src/app/state/bowling.state';
import { BowlingServiceAbstract } from 'src/app/services/bowling/bowling-service.abstract';
import { bowlingServiceProvider } from 'src/app/services/bowling/bowling-service-factory';
import { PlayerService } from 'src/app/services/bowling/offline/player/player.service';
import { PlayersService } from 'src/app/services/players/players.service';
import { TitleComponent } from 'src/app/components/title/title.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddPlayerComponent } from '../components/add-player/add-player.component';
import { GameComponent } from '../components/game/game.component';
import { FormsModule } from '@angular/forms';
import { OfflineRatingService } from 'src/app/services/bowling/offline/offline-rating/offline-rating.service';
import { RatingService } from 'src/app/services/bowling/online/rating/rating.service';
import { GameService } from 'src/app/services/bowling/offline/game/game.service';
import { ScoreCalculatorService } from 'src/app/services/bowling/offline/score-calculator/score-calculator.service';
import { BowlService } from 'src/app/services/bowling/offline/bowl-service/bowl.service';

@Component({
   selector: 'app-bowl',
   templateUrl: './bowling-view.component.html',
   styleUrls: ['./bowling-view.component.scss'],
   standalone: true,
   imports: [
      FormsModule,
      TitleComponent,
      MatSlideToggleModule,
      AddPlayerComponent,
      GameComponent
   ],
   providers: [
      bowlingServiceProvider,
      PlayerService,
      PlayersService,
      OfflineRatingService,
      RatingService,
      GameService,
      ScoreCalculatorService,
      BowlService,]
})
export class BowlingViewComponent implements OnInit {
   status: WritableSignal<string> = BowlingState.status;
   players: WritableSignal<ReadonlyArray<Player>> = BowlingState.players;
   game: WritableSignal<Game | undefined> = BowlingState.game;
   ratings: WritableSignal<ReadonlyArray<BowlerRating>> = BowlingState.ratings;
   isChecked: boolean = false;

   constructor(private readonly _dialog: MatDialog,
      private readonly _bowlingService: BowlingServiceAbstract,
      private readonly _playerService: PlayersService) { }

   ngOnInit() {
      this._bowlingService.getRatings();
   }

   addPlayer(player: { name: string, rating: number }): void {
      this._playerService.addPlayer(player.name, player.rating);
   }

   removePlayer(playerNumber: number) {
      this._playerService.removePlayer(playerNumber);
   }

   playGame() {
      this._bowlingService.bowl(BowlingState.players());
   }

   newGame() {
      this._playerService.removeAllPlayers();
      BowlingState.game.set({ bowlers: [], completed: false, winner: undefined });
   }

   changePlayerRatings(): void {
      this.openDialog(BowlingState.ratings());
   }

   toggleStatus(): void {
      this.isChecked = !this.isChecked;
      BowlingState.status.set(this.isChecked ? 'online' : 'offline');
   }

   private openDialog(ratings: ReadonlyArray<BowlerRating>): void {
      const dialogRef = this._dialog.open(PlayerRatingDialogComponent, { data: { ratings } });

      dialogRef.afterClosed().subscribe((rating: number) => {
         if (rating) {
            this.ratingChanged(rating);
         }
      });
   }

   private ratingChanged(rating: number): void {
      this._playerService.changePlayerRatings(rating, BowlingState.players());
   }
}
