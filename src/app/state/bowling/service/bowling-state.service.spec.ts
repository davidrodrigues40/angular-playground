import { TestBed, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';
import { BowlingState } from '../../app.state';
import { StateEvent } from '../../common/state-event';
import * as actions from '../bowling.actions';
import { BowlingGame } from '../models/bowling-game.model';
import { Scorecard } from '../models/scorecard.model';
import { BowlingStateService } from './bowling-state.service';

describe('BowlingStateService', () =>
{
    let service: BowlingStateService;
    let store: MockStore<BowlingState>;
    const defaultRatings: BowlerRating[] = [];

    const defaultWinner: Scorecard = {
        name: '',
        score: 0,
    };

    const defaultGame: BowlingGame = {
        bowlers: [],
        winner: defaultWinner
    };

    const initialState: BowlingState = {
        players: [],
        ratings: [],
        game: defaultGame
    };

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [
                BowlingStateService,
                provideMockStore<BowlingState>({ initialState })
            ]
        });
        store = TestBed.inject(MockStore);
        service = TestBed.inject(BowlingStateService);
    });

    it('should be created', () =>
    {
        expect(service).toBeTruthy();
    });

    describe('events', () =>
    {
        describe('when getPlayers invoked', () =>
        {
            it('should return getPlayers event', () =>
            {
                const expected = new StateEvent(actions.BowlingActions.getPlayers(), store);

                const actual = service.events.getPlayers();

                expect(actual).toEqual(expected);
            });
        });
        describe('when addPlayer invoked', () =>
        {
            it('should return addPlayer event', () =>
            {
                const expected = new StateEvent(actions.BowlingActions.addPlayer({ payload: { name: 'john', rating: 1, players: [] } }), store);

                const actual = service.events.addPlayer('john', 1, []);

                expect(actual).toEqual(expected);
            });

            describe('when removePlayer invoked', () =>
            {
                it('should return removePlayer event', () =>
                {
                    const expected = new StateEvent(actions.BowlingActions.removePlayer({ payload: { id: 1, players: [] } }), store);

                    const actual = service.events.removePlayer(1, []);

                    expect(actual).toEqual(expected);
                });
            });

            describe('when bowl invoked', () =>
            {
                it('should return bowl event', () =>
                {
                    const expected = new StateEvent(actions.BowlingActions.bowl({ payload: [] }), store);

                    const actual = service.events.bowl([]);

                    expect(actual).toEqual(expected);
                });
            });

            describe('when getRatings invoked', () =>
            {
                it('should return getRatings event', () =>
                {
                    const expected = new StateEvent(actions.BowlingActions.getRatings(), store);

                    const actual = service.events.getRatings();

                    expect(actual).toEqual(expected);
                });
            });

            describe('when newGame invoked', () =>
            {
                it('should return newGame event', () =>
                {
                    const expected = new StateEvent(actions.BowlingActions.newGame(), store);

                    const actual = service.events.newGame();

                    expect(actual).toEqual(expected);
                });
            });
        });
        describe('when changeAllPlayersRatings invoked', () =>
        {
            it('should return changeAllPlayersRatings event', () =>
            {
                const expected = new StateEvent(actions.BowlingActions.changeAllPlayersRatings({ payload: { rating: 1, players: [] } }), store);

                const actual = service.events.changeAllPlayersRatings(1, []);

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('observables', () =>
    {
        describe('when players$ invoked', () =>
        {
            it('should return players observable', waitForAsync(() =>
            {
                spyOn(store, 'select').and.returnValue(of([]));

                service.observables.players$
                    .subscribe(players =>
                    {
                        expect(players).toEqual([]);
                    });
            }));
        });

        describe('when game$ invoked', () =>
        {
            it('should return game observable', waitForAsync(() =>
            {
                spyOn(store, 'select').and.returnValue(of(defaultGame));

                service.observables.game$
                    .subscribe(game =>
                    {
                        expect(game).toEqual(defaultGame);
                    });
            }));
        });

        describe('when winner$ invoked', () =>
        {
            it('should return winner observable', waitForAsync(() =>
            {
                spyOn(store, 'select').and.returnValue(of(defaultWinner));

                service.observables.winner$
                    .subscribe(winner =>
                    {
                        expect(winner).toEqual(defaultWinner);
                    });
            }));
        });

        describe('when ratings$ invoked', () =>
        {
            it('should return ratings observable', waitForAsync(() =>
            {
                spyOn(store, 'select').and.returnValue(of(defaultRatings));

                service.observables.ratings$
                    .subscribe(ratings =>
                    {
                        expect(ratings).toEqual(defaultRatings);
                    });
            }));
        });

        describe('when score$ invoked', () =>
        {
            it('should return score observable', waitForAsync(() =>
            {
                spyOn(store, 'select').and.returnValue(of(310))

                service.observables.score$('chuck')
                    .subscribe(score =>
                    {
                        expect(score).toEqual(310);
                    });
            }));
        });

        describe('when rating$ invoked', () =>
        {
            it('should return rating observable', waitForAsync(() =>
            {
                spyOn(store, 'select').and.returnValue(of(defaultRatings[0]))

                service.observables.rating$(1)
                    .subscribe(rating =>
                    {
                        expect(rating).toEqual(defaultRatings[0]);
                    });
            }));
        });
    });
});
