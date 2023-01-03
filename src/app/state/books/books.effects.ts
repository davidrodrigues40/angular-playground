import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, mergeMap } from "rxjs";
import { GoogleBooksService } from "src/app/services/books/books.service";
import { BookEvent } from "./book.events";

@Injectable()
export class BookEffects {
  constructor(private readonly _actions$: Actions,
    private readonly _service: GoogleBooksService) { }

  loadGoogleBooks$ = createEffect(() =>
    this._actions$.pipe(
      ofType(BookEvent.getBooks),
      mergeMap(() => this._service.getBooks$()
        .pipe(
          map(books => ({ type: BookEvent.retrievedBookList, payload: books })),
          catchError(() => EMPTY)
        ))
    )
  );
}