import { createAction, props } from '@ngrx/store';
import { Book } from './books.model';

export const GetAllBooks = createAction('[BOOKS] Get All');
export const GetAllBooksSuccess = createAction('[BOOKS] Get All Success', props<{ payload: ReadonlyArray<Book> }>());
export const GetAllBooksFail = createAction('[BOOKS] Get All Failed', props<{ payload: any }>());

export const GetCollection = createAction('[COLLECTION] Get All');
export const GetCollectionSuccess = createAction('[COLLECTION] Get All Success', props<{ payload: ReadonlyArray<Book> }>());

export const AddBookToCollection = createAction('[COLLECTION] Add Book', props<{ payload: string }>());
export const AddBookToCollectionSuccess = createAction('[COLLECTION] Add Book Success', props<{ payload: Book }>());

export const RemoveBookFromCollection = createAction('[COLLECTION] Remove Book', props<{ payload: string }>());
export const RemoveBookFromCollectionSuccess = createAction('[COLLECTION] Remove Book Success', props<{ payload: Book }>());

export const ClearCollection = createAction('[COLLECTION] Clear Collection');
export const ClearCollectionSuccess = createAction('[COLLECTION] Clear Collectcion Success');