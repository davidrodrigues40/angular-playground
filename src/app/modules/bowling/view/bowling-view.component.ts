import { Component, OnInit } from '@angular/core';
import { Observable, first, map } from 'rxjs';
import { BowlingGame } from 'src/app/state/bowling/models/bowling-game.model';
import { Player } from 'src/app/state/bowling/models/player.model';
import { BowlingStateService } from 'src/app/state/bowling/service/bowling-state.service';
import { BowlerRating } from '../models/bowler-rating.model';

@Component({
  selector: 'app-bowl',
  templateUrl: './bowling-view.component.html',
  styleUrls: ['./bowling-view.component.scss']
})
export class BowlingViewComponent implements OnInit {
  players$: Observable<ReadonlyArray<Player>> = this._service.observables.players$;
  game$: Observable<Readonly<BowlingGame | undefined>> = this._service.observables.game$;
  ratings$: Observable<ReadonlyArray<BowlerRating>> = this._service.observables.ratings$;

  constructor(private readonly _service: BowlingStateService) {
  }

  ngOnInit() {
    this._service.events.getRatings().emit();
  }

  addPlayer(player: { name: string, rating: number }): void {
    this._service.observables.players$
      .pipe(first())
      .subscribe(players => this._service.events.addPlayer(player.name, player.rating, players).emit());
  }

  removePlayer(playerNumber: number) {
    this._service.observables.players$
      .pipe(first())
      .subscribe(players => this._service.events.removePlayer(playerNumber, players).emit());
  }

  playGame() {
    this._service.observables.players$
      .pipe(first())
      .subscribe(players => this._service.events.bowl(players).emit());
  }

  getScore$(playerName: string): Observable<number | undefined> {
    return this._service.observables.score$(playerName);
  }

  getRating$(rating: number): Observable<string> {
    return this._service.observables.rating$(rating).pipe(map(rating => rating ? rating.value : 'Beginner'));
  }

  newGame() {
    this._service.events.newGame().emit();
  }
}
