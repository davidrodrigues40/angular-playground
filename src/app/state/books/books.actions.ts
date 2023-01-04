import { createAction, props } from '@ngrx/store';
import { Book } from './books.model';

export const GetAllBooks = createAction('[BOOKS] Get All');
export const GetAllBooksSuccess = createAction('[BOOKS] Get All Success', props<{ payload: ReadonlyArray<Book> }>());