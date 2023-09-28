import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { GoogleBooksService } from "./books.service";

describe('BooksService', () => {
    let httpClient: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);
    let service: GoogleBooksService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GoogleBooksService,
                { provide: HttpClient, useValue: httpClient }
            ]
        });
        service = TestBed.inject(GoogleBooksService);
    });

    it('should be created', () => {
        const service: GoogleBooksService = TestBed.inject(GoogleBooksService);
        expect(service).toBeTruthy();
    });
});
