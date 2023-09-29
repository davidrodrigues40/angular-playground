import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BookListComponent } from "./book-list.component";

describe('BookListComponent', () => {
    let component: BookListComponent;
    let fixture: ComponentFixture<BookListComponent>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BookListComponent, BookItemMockComponent, EmptyDataMockComponent]
        });

        fixture = TestBed.createComponent(BookListComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
@Component({ selector: 'app-book-item', template: '' })
class BookItemMockComponent { }

@Component({ selector: 'app-empty-data', template: '' })
class EmptyDataMockComponent { }