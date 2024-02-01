import { TestBed, waitForAsync } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { ChuckNorrisFactState } from '../../app.state';
import { StateEvent } from '../../common/state-event';
import * as actions from '../chuck-norris.actions';
import { ChuckNorrisFact } from '../models/chuck-norris-fact';
import { ChuckNorrisStateService } from './chuck-norris-state.service';

describe('ChuckNorrisStateService', () =>
{
    let service: ChuckNorrisStateService;
    let store: MockStore<ChuckNorrisFactState>;

    const defaultFact: ChuckNorrisFact = {
        icon_url: '',
        id: '',
        url: '',
        value: ''
    };

    const defaultCategory = { category: '' };

    const initialState: ChuckNorrisFactState = {
        fact: {
            icon_url: '',
            id: '',
            url: '',
            value: ''
        },
        categories: []
    };

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [
                ChuckNorrisStateService,
                provideMockStore<ChuckNorrisFactState>({ initialState })]
        });
        service = TestBed.inject(ChuckNorrisStateService);
        store = TestBed.inject(MockStore)
    });

    it('should be created', () =>
    {
        expect(service).toBeTruthy();
    });

    describe('effects', () =>
    {
        describe('when fetchFact invoked', () =>
        {
            it('should return getFact event', () =>
            {
                const expected: StateEvent<string, Store<ChuckNorrisFactState>> = new StateEvent(actions.factActions.getFact(), store);

                const actual = service.events.fetchFact();

                expect(actual).toEqual(expected);
            });
        });

        describe('when fetchFactForCategory invoked', () =>
        {
            it('should return getFactForCategory event', () =>
            {
                const category = { category: 'dev' };
                const expected: StateEvent<string, Store<ChuckNorrisFactState>> = new StateEvent(actions.factActions.getFactForCategory({ payload: category }), store);

                const actual = service.events.fetchFactForCategory(category);

                expect(actual).toEqual(expected);
            });
        });

        describe('when fetchCategories invoked', () =>
        {
            it('should return getAll event', () =>
            {
                const expected: StateEvent<string, Store<ChuckNorrisFactState>> = new StateEvent(actions.categoryActions.getAll(), store);

                const actual = service.events.fetchCategories();

                expect(actual).toEqual(expected);
            });
        });

        describe('when setSelectedCategory invoked', () =>
        {
            it('should return categorySelected event', () =>
            {
                const category = { category: 'dev' };
                const expected: StateEvent<string, Store<ChuckNorrisFactState>> = new StateEvent(actions.categoryActions.categorySelected({ payload: category }), store);

                const actual = service.events.setSelectedCategory(category);

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('obserables', () =>
    {
        describe('when fact$ invoked', () =>
        {
            it('should return fact observable', waitForAsync(() =>
            {
                const expected: ChuckNorrisFact = { ...defaultFact, value: 'chuck rules' };
                spyOn(store, 'select').and.returnValue(of(expected));

                service.observables.fact$
                    .subscribe(fact =>
                    {
                        expect(fact).toEqual(expected);
                    });
            }));
        });

        describe('when categories$ invoked', () =>
        {
            it('should return categories observable', waitForAsync(() =>
            {
                const expected = [{ ...defaultCategory, category: 'dev' }];
                spyOn(store, 'select').and.returnValue(of(expected));

                service.observables.categories$
                    .subscribe(categories =>
                    {
                        expect(categories).toEqual(expected);
                    });
            }));
        });

        describe('when selectedCategory$ invoked', () =>
        {
            it('should return selected category observable', waitForAsync(() =>
            {
                const expected = { ...defaultCategory, category: 'dev' };
                spyOn(store, 'select').and.returnValue(of(expected));

                service.observables.selectedCategory$
                    .subscribe(category =>
                    {
                        expect(category).toEqual(expected);
                    });
            }));
        });
    });
});
