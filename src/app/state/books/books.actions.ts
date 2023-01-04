import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Book } from './books.model';

export const bookActions = createActionGroup({
  source: '[BOOKS]',
  events: {
    'Get All': emptyProps(),
    'Get All Success': props<{ payload: ReadonlyArray<Book> }>(),
    'Get All Failed': props<{ payload: any }>()
  }
});

export const collectionActions = createActionGroup({
  source: '[COLLECTIONS]',
  events: {
    'Get All': emptyProps(),
    'Get All Success': props<{ payload: ReadonlyArray<Book> }>(),
    'Add Book': props<{ payload: string }>(),
    'Add Book Success': props<{ payload: Book }>(),
    'Remove Book': props<{ payload: string }>(),
    'Remove Book Success': props<{ payload: Book }>(),
    'Clear Collection': emptyProps(),
    'Clear Collection Success': emptyProps()
  }
});