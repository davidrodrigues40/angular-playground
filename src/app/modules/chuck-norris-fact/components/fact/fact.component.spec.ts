import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { EmptyDataComponent } from 'src/app/components/empty-data/empty-data.component';
import { FactComponent } from './fact.component';

describe('FactComponent', () =>
{
    let component: FactComponent;
    let fixture: ComponentFixture<FactComponent>;

    @Component({
        selector: 'app-empty-data',
        template: ''
    })
    class MockEmptyDataComponent extends EmptyDataComponent { }

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
            declarations: [
                FactComponent,
                MockEmptyDataComponent
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FactComponent);
        component = fixture.componentInstance;
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});


