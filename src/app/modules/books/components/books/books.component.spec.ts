import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { BooksState } from 'src/app/state/app.state';
import { Book } from 'src/app/state/books/models/books.model';
import { BookStateService } from 'src/app/state/books/service/book-state.service';
import { StateEvent } from 'src/app/state/common/state-event';
import { BookCollectionComponent } from '../book-collection/book-collection.component';
import { BookListComponent } from '../book-list/book-list.component';
import { BooksComponent } from './books.component';

describe('BooksComponent', () =>
{
    let component: BooksComponent;
    let fixture: ComponentFixture<BooksComponent>;
    let service: jasmine.SpyObj<BookStateService> = jasmine.createSpyObj('BookStateService', ['events', 'observables']);
    let event: jasmine.SpyObj<StateEvent<string, Store<BooksState>>> = jasmine.createSpyObj('Event', ['emit']);
    const books: Book[] = [];

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
            declarations: [
                BooksComponent,
                BookListComponent,
                BookCollectionComponent
            ],
            providers: [
                { provide: BookStateService, useValue: service }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(BooksComponent);
        component = fixture.componentInstance;

        Object.defineProperties(service, {
            events: {
                value: {
                    removeBook: function (id: string) { return event; },
                    addBook: function (id: string) { return event; },
                    clearCollection: function () { return event; },
                    fetchBooks: function () { return event; },
                    fetchCollections: function () { return event; }
                }
            },
            observables: {
                value: {
                    books$: of(books),
                    collection$: of(books)
                }
            }
        });

    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () =>
    {

        it('should call the service events', () =>
        {
            component.ngOnInit();

            expect(service.events.fetchBooks().emit).toHaveBeenCalled();
            expect(service.events.fetchCollections().emit).toHaveBeenCalled();
        });
    });

    describe('onAdd', () =>
    {
        it('should call the service events', () =>
        {
            component.onAdd("1");

            expect(service.events.addBook("1").emit).toHaveBeenCalled();
        });
    });

    describe('onRemove', () =>
    {
        it('should call the service events', () =>
        {
            component.onRemove("1");

            expect(service.events.removeBook("1").emit).toHaveBeenCalled();
        });
    });

    describe('onClear', () =>
    {
        it('should call the service events', () =>
        {
            component.onClear();

            expect(service.events.clearCollection().emit).toHaveBeenCalled();
        });
    });
});
