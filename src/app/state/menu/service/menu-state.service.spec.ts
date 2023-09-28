import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MenuState } from '../../app.state';
import { MenuStateService } from './menu-state.service';

describe('MenuStateService', () => {
  let service: MenuStateService;
  let store: MockStore<MenuState>;
  let initialState: MenuState = {
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
});
