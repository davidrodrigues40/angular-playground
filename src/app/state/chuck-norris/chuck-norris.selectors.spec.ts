import { ChuckNorrisFactState } from "../app.state";
import * as selectors from './chuck-norris.selectors';
import { ChuckNorrisFact } from "./models/chuck-norris-fact";
import { FactCategory } from "./models/fact-category";

describe('Bowling Selectors', () => {
    const defaultFact: ChuckNorrisFact = {
        icon_url: "",
        id: "",
        url: "",
        value: ""
    };

    const defaultCategory: FactCategory = {
        category: ""
    };

    const initialState: ChuckNorrisFactState = {
        fact: defaultFact,
        categories: [],
        selectedCategory: undefined
    };

    describe('when getFact invoked', () => {
        it('should return fact', () => {
            const expected: ChuckNorrisFact = { ...defaultFact, value: 'chuck rules' };

            const fact = selectors.getFact.projector({ ...initialState, fact: expected });

            expect(fact).toEqual(expected);
        });
    });

    describe('when getCategories invoked', () => {
        it('should return categories', () => {
            const expected = [{ ...defaultCategory, category: 'dev' }];

            const categories = selectors.getCategories.projector({ ...initialState, categories: expected });

            expect(categories).toEqual(expected);
        });
    });

    describe('when getSelectedCategory invoked', () => {
        it('should return selected category', () => {
            const expected = { ...defaultCategory, category: 'dev' };

            const category = selectors.getSelectedCategory.projector({ ...initialState, selectedCategory: expected });

            expect(category).toEqual(expected);
        });
    });
});