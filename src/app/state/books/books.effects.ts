import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, tap, mergeMap, switchMap } from "rxjs";
import { GoogleBooksService } from "src/app/services/books/books.service";
import * as fromActions from './books.actions';

@Injectable()
export class BookEffects {
  constructor(private readonly _actions$: Actions,
    private readonly _service: GoogleBooksService) { }

  loadGoogleBooks$ = createEffect(() => this._actions$.pipe(
    ofType(fromActions.GetAllBooks),
    mergeMap(() =>
      this._service.getBooks$()
        .pipe(
          map(books => fromActions.GetAllBooksSuccess({ payload: books })),
          catchError(() => EMPTY)
        )
    )
  ));
}

@Injectable()
export class CollectionEffects {
  constructor(private readonly _actions$: Actions,
    private readonly _service: GoogleBooksService) { }

  loadCollection$ = createEffect(() => this._actions$.pipe(
    ofType(fromActions.GetCollection),
    mergeMap(() =>
      this._service.getCollection$()
        .pipe(
          tap(books => console.log('books', books)),
          map(books => fromActions.GetCollectionSuccess({ payload: books })),
          catchError(() => EMPTY)
        )
    )
  ));

  addBook$ = createEffect(() => this._actions$.pipe(
    ofType(fromActions.AddBookToCollection),
    map(action => action.payload),
    switchMap(id =>
      this._service.addBook$(id)
        .pipe(
          map(response => fromActions.AddBookToCollectionSuccess({ payload: response })))
    )
  ));

  removeBook$ = createEffect(() => this._actions$.pipe(
    ofType(fromActions.RemoveBookFromCollection),
    map(action => action.payload),
    switchMap(id =>
      this._service.removeBook$(id)
        .pipe(
          tap(response => console.log('response', response)),
          map(response => fromActions.RemoveBookFromCollectionSuccess({ payload: response })))
    )
  ));

  clearCollection$ = createEffect(() => this._actions$.pipe(
    ofType(fromActions.ClearCollection),
    switchMap(_ => this._service.clearCollection$()
      .pipe(
        map(_ => fromActions.ClearCollectionSuccess())
      ))
  ));
}