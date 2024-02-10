import { first, map, Observable } from 'rxjs';
import { Game } from 'src/app/interfaces/models/bowling/game';
import { Player } from 'src/app/interfaces/models/bowling/player';
import { BowlingStateService } from 'src/app/state/bowling/service/bowling-state.service';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PlayerRatingDialogComponent } from '../components/player-rating-dialog/player-rating-dialog.component';
import { BowlerRating } from '../models/bowler-rating.model';

@Component({
   selector: 'app-bowl',
   templateUrl: './bowling-view.component.html',
   styleUrls: ['./bowling-view.component.scss']
})
export class BowlingViewComponent implements OnInit
{
   players$: Observable<ReadonlyArray<Player>> = this._service.observables.players$;
   game$: Observable<Readonly<Game | undefined>> = this._service.observables.game$;
   ratings$: Observable<ReadonlyArray<BowlerRating>> = this._service.observables.ratings$;

   constructor(private readonly _service: BowlingStateService, private readonly _dialog: MatDialog) { }

   ngOnInit()
   {
      this._service.events.getRatings();
      this._service.events.getPlayers();
   }

   addPlayer(player: { name: string, rating: number }): void
   {
      this._service.observables.players$
         .pipe(first())
         .subscribe(players => this._service.events.addPlayer(player.name, player.rating, players));
   }

   removePlayer(playerNumber: number)
   {
      this._service.observables.players$
         .pipe(first())
         .subscribe(players => this._service.events.removePlayer(playerNumber, players));
   }

   playGame()
   {
      this._service.observables.players$
         .pipe(first())
         .subscribe(players => this._service.events.bowl(players));
   }

   getScore$(playerName: string): Observable<number | undefined>
   {
      return this._service.observables.score$(playerName);
   }

   getRating$(rating: number): Observable<string>
   {
      return this._service.observables.rating$(rating).pipe(map(rating => rating ? rating.value : 'Beginner'));
   }

   newGame()
   {
      this._service.events.newGame();
   }

   changePlayerRatings(): void
   {
      this.ratings$
         .pipe(first())
         .subscribe(ratings => this.openDialog(ratings));
   }

   private openDialog(ratings: ReadonlyArray<BowlerRating>): void
   {
      const dialogRef = this._dialog.open(PlayerRatingDialogComponent, { data: { ratings } });

      dialogRef.afterClosed().subscribe((rating: number) =>
      {
         if (rating)
         {
            this.ratingChanged(rating);
         }
      });
   }

   private ratingChanged(rating: number): void
   {
      this.players$
         .pipe(first())
         .subscribe(players => this._service.events.changeAllPlayersRatings(rating, players));
      ;
   }
}
