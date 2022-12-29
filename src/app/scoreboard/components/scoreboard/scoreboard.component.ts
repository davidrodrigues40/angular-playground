import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamType } from 'src/app/enums/scorecard-enums';
import { ScoreService } from 'src/app/services/score/score.service';
import { ScorecardComponent } from '../scorecard/scorecard.component';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent {
  @ViewChild('homeCard') homeCard!: ScorecardComponent;
  @ViewChild('awayCard') awayCard!: ScorecardComponent;

  public teamType = TeamType;

  constructor(private readonly _scoreService: ScoreService) { }

  public get homeScore$(): Observable<number> {
    return this._scoreService.homeScore$;
  };

  public get awayScore$(): Observable<number> {
    return this._scoreService.awayScore$;
  };

  public resetScore(): void {
    this._scoreService.resetRuns();
    this.homeCard.runsToAdd = null;
    this.awayCard.runsToAdd = null;
  }

  public addRuns(team: TeamType, runs: string): void {
    this._scoreService.addRunsToTeam(team, parseInt(runs));
  }

}
