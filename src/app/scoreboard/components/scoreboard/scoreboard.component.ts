import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TeamType } from 'src/app/enums/scorecard-enums';
import { GameState } from 'src/app/state/app.state';
import { Game } from 'src/app/state/game/game.model';
import { ScorecardComponent } from '../scorecard/scorecard.component';
import * as selectors from '../../../state/game/game.selectors';
import * as actions from '../../../state/game/game.actions';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  @ViewChild('homeCard') homeCard!: ScorecardComponent;
  @ViewChild('awayCard') awayCard!: ScorecardComponent;

  public teamType = TeamType;
  public manualScore: boolean = false;
  public home$: Observable<number> = this._state.select(selectors.getHomeScore);
  public away$: Observable<number> = this._state.select(selectors.getAwayScore);

  constructor(private readonly _state: Store<GameState>) { }

  ngOnInit(): void {
    this._state.dispatch(actions.GameActions.getScore());
  }

  public resetScore(): void {
    this.homeCard.runsToAdd = null;
    this.awayCard.runsToAdd = null;
  }

  public addRuns(team: TeamType, runs: number): void {

  }

  public enterGameScore(game: Game): void {


    this.manualScore = false;
  }

}
