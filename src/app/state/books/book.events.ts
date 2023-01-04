export class BookEvent {
  public static get gotBooks(): string {
    return '[Book Api] Got Books';
  };
  public static get getBooks(): string {
    return '[Book Api] Get Books';
  };
  public static addBook = 'Add Book';
  public static removeBook = 'Remove Book';
}