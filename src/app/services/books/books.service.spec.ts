import { Book } from 'src/app/interfaces/models/books/book.';

import { HttpClient } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { BookService } from './books.service';
import { of } from 'rxjs';
import { BooksState } from 'src/app/state/books.state';

describe('BooksService', () => {
   let bookSetSpy: jasmine.Spy;
   let bookSpy: jasmine.Spy;
   let searchingSpy: jasmine.Spy;
   let collectionSetSpy: jasmine.Spy;
   let collectionGetSpy: jasmine.Spy;
   let authorSpy: jasmine.Spy;
   let httpClient: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);
   let service: BookService;
   const defaultBook: Book = {
      id: "",
      volumeInfo: {
         title: "",
         authors: []
      }
   };
   const defaultBooks: { items: Book[] } = {
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
      searchingSpy = spyOn(BooksState.searching, 'set');
      collectionSetSpy = spyOn(BooksState.collection, 'set');
      collectionGetSpy = spyOn(BooksState, 'collection');
      bookSetSpy = spyOn(BooksState.books, 'set');
      bookSpy = spyOn(BooksState, 'books');
      authorSpy = spyOn(BooksState.author, 'set');
      httpClient.get.calls.reset();

      bookSetSpy.calls.reset();
      bookSpy.calls.reset();
      searchingSpy.calls.reset();
      collectionSetSpy.calls.reset();
   });

   it('should be created', () => {
      const service: BookService = TestBed.inject(BookService);
      expect(service).toBeTruthy();
   });

   describe('when getBooksFromGoogle is called', () => {
      it('should set books and searching state to empty and false respectively when author is empty', waitForAsync(() => {
         const author = '';

         service.getBooksFromGoogle(author);

         expect(bookSetSpy).toHaveBeenCalledWith([]);
         expect(searchingSpy).toHaveBeenCalledWith(false);
      }
      ));

      it('should call httpClient.get with the correct URL', waitForAsync(() => {
         const author = 'testAuthor';
         const expectedUrl = `https://www.googleapis.com/books/v1/volumes?maxResults=20&orderBy=relevance&q=${author}`;
         httpClient.get.and.returnValue(of(defaultBooks));

         service.getBooksFromGoogle(author);

         expect(httpClient.get).toHaveBeenCalledWith(expectedUrl);
         expect(bookSetSpy).toHaveBeenCalledWith(defaultBooks.items);
         expect(searchingSpy).toHaveBeenCalledWith(false);

      }));
   });

   describe('when addBook is called', () => {
      it('should not add the book if it does not exist in the books state', () => {
         const bookId = 'testBookId';
         const book: Book = { ...defaultBook, id: bookId };
         bookSpy.and.returnValue([book]);

         service.addBook('nonExistentBookId');

         expect(collectionSetSpy).not.toHaveBeenCalled();
      });

      it('should add the book to the collection', () => {
         const bookId = 'testBookId';
         const book: Book = { ...defaultBook, id: bookId };
         bookSpy.and.returnValue([book]);
         collectionGetSpy.and.returnValue([]);

         service.addBook(bookId);

         expect(collectionSetSpy).toHaveBeenCalledWith([book]);
      });
   });

   describe('when removeBook is called', () => {
      it('should remove the book from the collection', () => {
         const bookId = 'testBookId';
         const book: Book = { ...defaultBook, id: bookId };
         collectionGetSpy.and.returnValue([book]);

         service.removeBook(bookId);

         expect(collectionSetSpy).toHaveBeenCalledWith([]);
      });
   });

   describe('when clearCollection is called', () => {
      it('should clear the collection', () => {
         service.clearCollection();

         expect(collectionSetSpy).toHaveBeenCalledWith([]);
      });
   });

   describe('when setAuthor is called', () => {
      it('should set the author state', () => {
         const author = 'testAuthor';

         service.setAuthor(author);

         expect(authorSpy).toHaveBeenCalledWith(author);
      });
   });
});
