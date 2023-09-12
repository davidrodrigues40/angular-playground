import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TeamType } from 'src/app/enums/scorecard-enums';
import { GameState } from 'src/app/state/app.state';
import { Game } from 'src/app/state/game/game.model';
import * as actions from '../../../state/game/game.actions';
import * as selectors from '../../../state/game/game.selectors';
import { ScorecardComponent } from '../scorecard/scorecard.component';

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
    this.homeCard.runsToAdd = 0;
    this.awayCard.runsToAdd = 0;
    this._state.dispatch(actions.GameActions.resetScore());
  }

  public addRuns(team: TeamType, runs: number): void {
    if (team === TeamType.home)
      this._state.dispatch(actions.GameActions.addRunsToHome({ payload: runs }));
    else
      this._state.dispatch(actions.GameActions.addRunsToAway({ payload: runs }));
  }

  public enterGameScore(game: Game): void {
    this._state.dispatch(actions.GameActions.setScores({ payload: game }));

    this.manualScore = false;
  }

}
