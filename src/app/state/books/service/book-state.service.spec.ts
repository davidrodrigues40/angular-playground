import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { BooksState } from '../../app.state';
import { Event } from '../../common/event';
import * as actions from '../books.actions';
import { Book } from '../models/books.model';
import { BookStateService } from './book-state.service';

describe('BookStateService', () => {
  let service: BookStateService;
  let store: MockStore<BooksState>;
  const defaultBook: Book = {
    id: '',
    volumeInfo: {
      title: '',
      authors: []
    }
  };
  const initialState: BooksState = {
    books: [],
    message: undefined
  };

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

  describe('events', () => {
    describe('when fetchBooks invoked', () => {
      it('should return getAll books event', () => {
        const expected: Event<string, Store<BooksState>> = new Event(actions.bookActions.getAll(), store);

        const actual: Event<string, Store<BooksState>> = service.events.fetchBooks();

        expect(actual).toEqual(expected);
      });
    });

    describe('when fetchCollections invoked', () => {
      it('should return getAll collections event', () => {
        const expected: Event<string, Store<BooksState>> = new Event(actions.collectionActions.getAll(), store);

        const actual: Event<string, Store<BooksState>> = service.events.fetchCollections();

        expect(actual).toEqual(expected);
      });
    });

    describe('when addBook invoked', () => {
      it('should return add book event', () => {
        const expected: Event<string, Store<BooksState>> = new Event(actions.collectionActions.addBook({ payload: '1' }), store);

        const actual: Event<string, Store<BooksState>> = service.events.addBook('1');

        expect(actual).toEqual(expected);
      });
    });

    describe('when removeBook invoked', () => {
      it('should return remove book event', () => {
        const expected: Event<string, Store<BooksState>> = new Event(actions.collectionActions.removeBook({ payload: '1' }), store);

        const actual: Event<string, Store<BooksState>> = service.events.removeBook('1');

        expect(actual).toEqual(expected);
      });
    });

    describe('when clearBooks invoked', () => {
      it('should return clear books event', () => {
        const expected: Event<string, Store<BooksState>> = new Event(actions.collectionActions.clearCollection(), store);

        const actual: Event<string, Store<BooksState>> = service.events.clearCollection();

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('observables', () => {
    describe('when books$ invoked', () => {
      it('should return selector', () => {
        spyOn(store, 'select').and.returnValue(of([defaultBook]));

        service.observables.books$
          .subscribe(books => {
            expect(books).toEqual([defaultBook]);
          });
      });
    });

    describe('when message$ invoked', () => {
      it('should return selector', () => {
        spyOn(store, 'select').and.returnValue(of('message'));

        service.observables.message$
          .subscribe(message => {
            expect(message).toEqual('message');
          });
      });
    });

    describe('when collection$ invoked', () => {
      it('should return selector', () => {
        spyOn(store, 'select').and.returnValue(of([defaultBook]));

        service.observables.collection$
          .subscribe(collections => {
            expect(collections).toEqual([defaultBook]);
          });
      });
    });
  });

});
