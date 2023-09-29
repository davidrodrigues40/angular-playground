import { HttpClient } from "@angular/common/http";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { of } from "rxjs";
import { Book } from "src/app/state/books/models/books.model";
import { GoogleBooksService } from "./books.service";

describe('BooksService', () => {
    let httpClient: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);
    let service: GoogleBooksService;
    const defaultBook: Book = {
        id: "",
        volumeInfo: {
            title: "",
            authors: []
        }
    };
    const defaultBooks: { items?: Book[] } = {
        items: undefined
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GoogleBooksService,
                { provide: HttpClient, useValue: httpClient }
            ]
        });
        service = TestBed.inject(GoogleBooksService);

        httpClient.get.calls.reset();
    });

    it('should be created', () => {
        const service: GoogleBooksService = TestBed.inject(GoogleBooksService);
        expect(service).toBeTruthy();
    });

    describe('when getBooks$ invoked', () => {
        it('should call httpClient.get and return books', waitForAsync(() => {
            var books = { ...defaultBooks, items: [defaultBook] }
            httpClient.get.and.returnValue(of(books));

            service.getBooks$()
                .subscribe((books) => {
                    expect(books).toEqual([defaultBook])
                });
        }));

        it('should return empty array if no books found', () => {
            httpClient.get.and.returnValue(of(defaultBooks));

            service.getBooks$()
                .subscribe((books) => {
                    expect(books).toEqual([])
                });
        });
    });

    describe('when get collection invoked', () => {
        it('should return empty array', waitForAsync(() => {
            service.getCollection$()
                .subscribe((books) => {
                    expect(books).toEqual([])
                });
        }));
    });

    describe('when add book invoked', () => {
        it('should return book', waitForAsync(() => {
            var book = { ...defaultBook, id: 'id' };
            service['_books'] = [book];

            service.addBook$('id')
                .subscribe((book) => {
                    expect(book).toEqual(book)
                });
        }));
    });

    describe('when remove book invoked', () => {
        it('should return book', waitForAsync(() => {
            var book = { ...defaultBook, id: 'id' };
            service['_books'] = [book];

            service.removeBook$('id')
                .subscribe((book) => {
                    expect(book).toEqual(book)
                });
        }));
    });

    describe('when clear collection invoked', () => {
        it('should return void', waitForAsync(() => {
            service.clearCollection$()
                .subscribe((response) => {
                    expect(response).toEqual(void 0)
                });
        }));
    });
});
