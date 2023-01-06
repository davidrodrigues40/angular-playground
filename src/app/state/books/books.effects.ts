import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, mergeMap, switchMap, of } from "rxjs";
import { GoogleBooksService } from "src/app/services/books/books.service";
import * as fromActions from './books.actions';

@Injectable()
export class BookEffects {
  constructor(private readonly _actions$: Actions,
    private readonly _service: GoogleBooksService) { }

  loadGoogleBooks$ = createEffect(() => this._actions$.pipe(
    ofType(fromActions.bookActions.getAll),
    mergeMap(() =>
      this._service.getBooks$()
        .pipe(
          map(books => fromActions.bookActions.getAllSuccess({ payload: books })),
          catchError(error => of(fromActions.bookActions.getAllFailed({ payload: error })))
        )
    )
  ));
}

@Injectable()
export class CollectionEffects {
  constructor(private readonly _actions$: Actions,
    private readonly _service: GoogleBooksService) { }

  loadCollection$ = createEffect(() => this._actions$.pipe(
    ofType(fromActions.collectionActions.getAll),
    mergeMap(() =>
      this._service.getCollection$()
        .pipe(
          map(books => fromActions.collectionActions.getAllSuccess({ payload: books })),
          catchError(() => EMPTY)
        )
    )
  ));

  addBook$ = createEffect(() => this._actions$.pipe(
    ofType(fromActions.collectionActions.addBook),
    map(action => action.payload),
    switchMap(id =>
      this._service.addBook$(id)
        .pipe(
          map(response => fromActions.collectionActions.addBookSuccess({ payload: response })))
    )
  ));

  removeBook$ = createEffect(() => this._actions$.pipe(
    ofType(fromActions.collectionActions.removeBook),
    map(action => action.payload),
    switchMap(id =>
      this._service.removeBook$(id)
        .pipe(
          map(response => fromActions.collectionActions.removeBookSuccess({ payload: response })))
    )
  ));

  clearCollection$ = createEffect(() => this._actions$.pipe(
    ofType(fromActions.collectionActions.clearCollection),
    switchMap(_ => this._service.clearCollection$()
      .pipe(
        map(_ => fromActions.collectionActions.clearCollectionSuccess())
      ))
  ));
}