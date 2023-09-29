import { BooksState, CollectionState } from '../app.state';
import * as selectors from './books.selectors';
import { Book } from './models/books.model';

describe('Book Selectors', () => {
    const initialState: BooksState = {
        books: [],
        message: undefined
    };
    const initialCollectionState: CollectionState = {
        books: [],
        message: undefined
    };
    const defaultBook: Book = {
        id: '',
        volumeInfo: {
            title: '',
            authors: []
        }
    };

    it('should select the book from state', () => {
        const books = selectors.getBooks.projector({ ...initialState, books: [defaultBook] });

        expect(books).toEqual([defaultBook]);
    });

    it('should select the message from state', () => {
        const message = selectors.getMessage.projector({ ...initialState, message: 'message' });

        expect(message).toEqual('message');
    });

    it('should select the collection from state', () => {
        const collection = selectors.getCollection.projector({ ...initialCollectionState, books: [] });

        expect(collection).toEqual([]);
    });
});