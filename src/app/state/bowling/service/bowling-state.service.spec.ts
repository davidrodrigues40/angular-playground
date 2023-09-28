import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BowlingState } from '../../app.state';
import { BowlingStateService } from './bowling-state.service';

describe('BowlingStateService', () => {
  let service: BowlingStateService;
  let store: MockStore<BowlingState>;

  const initialState: BowlingState = {
    players: [],
    ratings: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BowlingStateService,
        provideMockStore<BowlingState>({ initialState })
      ]
    });
    service = TestBed.inject(BowlingStateService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
