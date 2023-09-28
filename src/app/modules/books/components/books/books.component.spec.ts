import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookStateService } from 'src/app/state/books/service/book-state.service';
import { BookCollectionComponent } from '../book-collection/book-collection.component';
import { BookListComponent } from '../book-list/book-list.component';
import { BooksComponent } from './books.component';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let service: jasmine.SpyObj<BookStateService> = jasmine.createSpyObj('BookStateService',
    ['fetchBooks$', 'fetchCollections$',],
    ['books$', 'collection$', 'addBook', 'removeBook$', 'clearCollection$']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BooksComponent,
        BookListComponent,
        BookCollectionComponent
      ],
      providers: [
        { provide: BookStateService, useValue: service }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
