import { TestBed, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { MenuState } from '../../app.state';
import { Event } from '../../common/event';
import * as actions from '../menu.actions';
import { MenuItem } from '../models/menu-item';
import { MenuStateService } from './menu-state.service';

describe('MenuStateService', () => {
  let service: MenuStateService;
  let store: MockStore<MenuState>;
  const defaultMenu = { items: [] };
  const defaultMenuItem: MenuItem = {
    value: '',
    route: ''
  };
  const initialState: MenuState = {
    items: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MenuStateService,
        provideMockStore({ initialState })
      ]
    });
    service = TestBed.inject(MenuStateService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('events', () => {
    describe('fetchMenu', () => {
      it('should return an event', () => {
        const expected: Event<string, MockStore<MenuState>> = new Event(actions.menuActions.getAll(), store);

        const actual = service.events.fetchMenu();

        expect(actual).toBeTruthy();
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('observables', () => {
    describe('menu$', () => {
      it('should return a from the store', waitForAsync(() => {
        const expected: MenuItem[] = [{ ...defaultMenuItem, value: 'test' }];
        spyOn(store, 'select').and.returnValue(of(expected));

        service.observables.menu$
          .subscribe(menu => {
            expect(menu).toEqual(expected);
          });
      }));
    });
  });
});
