import { of } from 'rxjs';
import { Book } from 'src/app/interfaces/models/books/book.';
import { bookSignals } from 'src/app/state/books/books.signals';

import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { BookService } from './books.service';

describe('BooksService', () =>
{
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

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         providers: [
            BookService,
            { provide: HttpClient, useValue: httpClient }
         ]
      });
      service = TestBed.inject(BookService);

      httpClient.get.calls.reset();
   });

   it('should be created', () =>
   {
      const service: BookService = TestBed.inject(BookService);
      expect(service).toBeTruthy();
   });

   describe('methods', () =>
   {
      it('should return all methods', () =>
      {
         expect(service.methods).toEqual({
            getBooks: 'getBooks'
         });
      });
   });

   describe('details', () =>
   {
      it('should return all details', () =>
      {
         expect(service.details).toEqual({
            getBooks: service['getBooks'],
            _books: [],
            httpClient: httpClient,
            base_url: `https://www.googleapis.com/books/v1/volumes?maxResults=${service['_take']}&orderBy=relevance&q=oliver%20sacks`
         });
      });
   });

   describe('getBooks', () =>
   {
      it('should call httpClient.get', () =>
      {
         httpClient.get.and.returnValue(of(defaultBooks));

         service['getBooks']();

         expect(httpClient.get).toHaveBeenCalled();
      });

      it('should set books', () =>
      {
         let signalSpy = spyOn(bookSignals().books, 'set');

         httpClient.get.and.returnValue(of(defaultBooks));

         service['getBooks']();

         expect(signalSpy).toHaveBeenCalledWith(defaultBooks.items as Book[]);
      });

      it('should set books to empty array', () =>
      {
         const signalSpy = spyOn(bookSignals().books, 'set');

         httpClient.get.and.returnValue(of({ ...defaultBooks, items: undefined }));

         service['getBooks']();

         expect(signalSpy).toHaveBeenCalledWith([] as Book[]);
      });
   });
});
