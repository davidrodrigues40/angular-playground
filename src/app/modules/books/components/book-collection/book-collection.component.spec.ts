import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookCollectionComponent } from './book-collection.component';

describe('BookCollectionComponent', () => {
    let component: BookCollectionComponent;
    let fixture: ComponentFixture<BookCollectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BookCollectionComponent, BookItemMockComponent, EmptyDataMockComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(BookCollectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    @Component({ selector: 'app-book-item', template: '' })
    class BookItemMockComponent { }

    @Component({ selector: 'app-empty-data', template: '' })
    class EmptyDataMockComponent { }
});
