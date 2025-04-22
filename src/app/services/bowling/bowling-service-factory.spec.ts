import { TestBed } from "@angular/core/testing";
import { bowlingServiceProvider } from "./bowling-service-factory";
import { BowlingServiceAbstract } from "./bowling-service.abstract";
import { BowlingState } from "src/app/state/bowling.state";
import { RatingService } from "./online/rating/rating.service";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { BowlingService } from "./online/bowling/bowling.service";
import { PlayerService } from "./offline/player/player.service";
import { OfflineRatingService } from "./offline/offline-rating/offline-rating.service";
import { GameService } from "./offline/game/game.service";
import { ScoreCalculatorService } from "./offline/score-calculator/score-calculator.service";
import { BowlService } from "./offline/bowl-service/bowl.service";
import { OfflineBowlingService } from "./offline/offline-bowling.service";

describe('BowlingServiceFactory', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BowlingServiceAbstract,
                RatingService,
                PlayerService,
                OfflineRatingService,
                GameService,
                ScoreCalculatorService,
                BowlService,
                HttpClient,
                HttpHandler]
        });
    });
    it('should be return Bowling Service', () => {
        BowlingState.status.set('online');
        TestBed.configureTestingModule({
            providers: [bowlingServiceProvider]
        });

        const service = TestBed.inject(BowlingServiceAbstract);

        expect(service).toBeTruthy();
        expect(service instanceof BowlingService).toBeTrue();
    });

    it('should be return Offline Bowling Service', () => {
        BowlingState.status.set('offline');
        TestBed.configureTestingModule({
            providers: [bowlingServiceProvider]
        });

        const service = TestBed.inject(BowlingServiceAbstract);

        expect(service).toBeTruthy();
        expect(service instanceof OfflineBowlingService).toBeTrue();
    });
});