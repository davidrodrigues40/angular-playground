import { Component, OnInit, WritableSignal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PlayerRatingDialogComponent } from '../components/player-rating-dialog/player-rating-dialog.component';
import { BowlerRating } from '../models/bowler-rating.model';
import { BowlingState } from '../bowling.state';
import { BowlingServiceAbstract } from 'src/app/modules/bowling/services/bowling-service.abstract';
import { bowlingServiceProvider } from 'src/app/modules/bowling/services/bowling-service-factory';
import { PlayersService } from 'src/app/modules/bowling/services/players.service';
import { TitleComponent } from 'src/app/components/title/title.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddPlayerComponent } from '../components/add-player/add-player.component';
import { GameComponent } from '../components/game/game.component';
import { FormsModule } from '@angular/forms';
import { RatingService } from 'src/app/modules/bowling/services/online/rating/rating.service';
import { PlayerService } from '../services/offline/player/player.service';
import { BowlService } from '../services/offline/bowl-service/bowl.service';
import { GameService } from '../services/offline/game/game.service';
import { OfflineRatingService } from '../services/offline/offline-rating/offline-rating.service';
import { ScoreCalculatorService } from '../services/offline/score-calculator/score-calculator.service';
import { Game } from '../models/game';
import { Player } from '../models/player';
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
