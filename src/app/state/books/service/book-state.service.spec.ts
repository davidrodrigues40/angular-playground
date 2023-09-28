import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BooksState } from '../../app.state';
import { BookStateService } from './book-state.service';

describe('BookStateService', () => {
  let service: BookStateService;
  let store: MockStore<BooksState>;
  let initialState: BooksState = {
    books: [],
    message: undefined
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookStateService,
        provideMockStore<BooksState>({ initialState })
      ]
    });
    service = TestBed.inject(BookStateService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
