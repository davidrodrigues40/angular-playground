import { Book } from 'src/app/interfaces/models/books/book.';

import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { BookService } from './books.service';

describe('BooksService', () => {
   let httpClient: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);
   let service: BookService;
   const defaultBook: Book = {
      id: "",
      volumeInfo: {
         title: "",
         authors: []
      }
   };
   const defaultBooks: { items?: Book[] } = {
      items: [defaultBook]
   };

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [
            BookService,
            { provide: HttpClient, useValue: httpClient }
         ]
      });
      service = TestBed.inject(BookService);

      httpClient.get.calls.reset();
   });

   it('should be created', () => {
      const service: BookService = TestBed.inject(BookService);
      expect(service).toBeTruthy();
   });
});
