import { BowlerRating } from 'src/app/modules/bowling/models/bowler-rating.model';
import { BowlingState } from '../app.state';
import * as selectors from './bowling.selectors';
import { Bowler } from './models/bowler.model';
import { BowlingGame } from './models/bowling-game.model';
import { Frame } from './models/frame.model';
import { Scorecard } from './models/scorecard.model';

describe('Bowling Selectors', () => {
    const initialState: BowlingState = {
        players: [],
        ratings: [],
        game: undefined
    };
    const defaultGame: BowlingGame = {
        bowlers: [],
        winner: {
            name: '',
            score: 0
        }
    };
    const defaultBowler: Bowler = {
        frames: new Map<number, Frame>(),
        score: 0,
        number: 0,
        name: '',
        rating: 0
    };

    describe('when getPlayers invoked', () => {
        it('should return players', () => {
            const state = selectors.getPlayers.projector(initialState);

            expect(state).toEqual([]);
        });
    });

    describe('when getGame invoked', () => {
        it('should return game', () => {
            const game = selectors.getGame.projector({ ...initialState, game: defaultGame });

            expect(game).toEqual(defaultGame);
        });
    });

    describe('when getWinner invoked', () => {
        it('should return winner', () => {
            const expected: Scorecard = { ...defaultGame.winner, name: 'winner', score: 300 };
            const winner = selectors.getWinner.projector({ ...initialState, game: { ...defaultGame, winner: expected } });

            expect(winner).toEqual(expected);
        });
    });

    describe('when getScore invoked', () => {
        it('should return score', () => {
            const expected = 310;
            const score = selectors.getScore('Chuck Norris').projector({ ...initialState, game: { ...defaultGame, bowlers: [{ ...defaultBowler, name: 'Chuck Norris', score: expected }] } });

            expect(score).toEqual(expected);
        });
    });

    describe('when getRatings invoked', () => {
        it('should return ratings', () => {
            const ratings = selectors.getRatings.projector(initialState);

            expect(ratings).toEqual([]);
        });
    });

    describe('when getRating invoked', () => {
        it('should return rating', () => {
            const expected: BowlerRating = {
                key: 200,
                value: 'Chuck Norris'
            };
            const rating = selectors.getRating(200).projector({ ...initialState, ratings: [expected] });

            expect(rating).toEqual(expected);
        });
    });
});