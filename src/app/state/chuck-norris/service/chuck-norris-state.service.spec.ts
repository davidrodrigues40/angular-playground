import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ChuckNorrisFactState } from '../../app.state';
import { ChuckNorrisStateService } from './chuck-norris-state.service';

describe('ChuckNorrisStateService', () => {
  let service: ChuckNorrisStateService;
  let store: MockStore<ChuckNorrisFactState>;

  const initialState: ChuckNorrisFactState = {
    fact: {
      icon_url: '',
      id: '',
      url: '',
      value: ''
    },
    categories: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChuckNorrisStateService,
        provideMockStore<ChuckNorrisFactState>({ initialState })]
    });
    service = TestBed.inject(ChuckNorrisStateService);
    store = TestBed.inject(MockStore)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
