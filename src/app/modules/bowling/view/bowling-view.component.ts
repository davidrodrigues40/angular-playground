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
  players$: Observable<ReadonlyArray<Player>> = this._service.players$;
  game$: Observable<Readonly<BowlingGame | undefined>> = this._service.game$;
  ratings$: Observable<ReadonlyArray<BowlerRating>> = this._service.ratings$;

  constructor(private readonly _service: BowlingStateService) {
  }

  ngOnInit() {
    this._service.getRatings();
  }

  addPlayer(player: { name: string, rating: number }): void {
    this._service.players$
      .pipe(first())
      .subscribe(players => this._service.addPlayer(player.name, player.rating, players));
  }

  removePlayer(playerNumber: number) {
    this._service.players$
      .pipe(first())
      .subscribe(players => this._service.removePlayer(playerNumber, players));
  }

  playGame() {
    this._service.players$
      .pipe(first())
      .subscribe(players => this._service.bowl(players));
  }

  getScore$(playerName: string): Observable<number | undefined> {
    return this._service.getScore$(playerName);
  }

  getRating$(rating: number): Observable<string> {
    return this._service.getRating$(rating).pipe(map(rating => rating ? rating.value : 'Beginner'));
  }

  newGame() {
    this._service.newGame();
  }
}
