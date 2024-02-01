import { Book } from "./models/books.model";

export interface BooksState
{
    books: ReadonlyArray<Book>;
    message: any;
}

export interface CollectionState
{
    books: ReadonlyArray<Book>;
    message: any;
}