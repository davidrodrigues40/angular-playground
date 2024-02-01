import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ChuckNorrisFactState } from 'src/app/state/app.state';
import { ChuckNorrisFact } from 'src/app/state/chuck-norris/models/chuck-norris-fact';
import { FactCategory } from 'src/app/state/chuck-norris/models/fact-category';
import { ChuckNorrisStateService } from 'src/app/state/chuck-norris/service/chuck-norris-state.service';
import { StateEvent } from 'src/app/state/common/state-event';
import { FactCategoriesComponent } from '../fact-categories/fact-categories.component';
import { FactGeneratorComponent } from './fact-generator.component';

describe('FactGeneratorComponent', () =>
{
    let component: FactGeneratorComponent;
    let fixture: ComponentFixture<FactGeneratorComponent>;
    let service: jasmine.SpyObj<ChuckNorrisStateService> = jasmine.createSpyObj('ChuckNorrisStateService', ['events', 'observables']);
    let event: jasmine.SpyObj<StateEvent<string, Store<ChuckNorrisFactState>>> = jasmine.createSpyObj('Event', ['emit']);
    const fact: ChuckNorrisFact = {
        icon_url: '',
        id: '',
        url: '',
        value: ''
    };
    const category: FactCategory = {
        name: ''
    };
    const categories: FactCategory[] = [category];

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
            declarations: [
                FactGeneratorComponent,
                FactCategoriesComponent],
            providers: [
                { provide: ChuckNorrisStateService, useValue: service }
            ],
            imports: [
                MatFormFieldModule,
                MatSelectModule
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FactGeneratorComponent);
        component = fixture.componentInstance;
        Object.defineProperties(service, {
            events: {
                value: {
                    fetchCategories: function () { return event; },
                    fetchFact: function () { return event; },
                    fetchFactForCategory: function () { return event; },
                    setSelectedCategory: function () { return event; },
                }
            },
            observables: {
                value: {
                    fact$: of(fact),
                    categories$: of(categories),
                    selectedCategory$: of(category),
                }
            }
        });
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () =>
    {
        it('should call fetchCategories', () =>
        {
            component.ngOnInit();
            expect(service.events.fetchCategories().emit).toHaveBeenCalled();
        });
    });

    describe('getFact', () =>
    {
        it('should call fetchFact', () =>
        {
            component.getFact();
            expect(service.events.fetchFact().emit).toHaveBeenCalled();
        });
    });

    describe('getFactForCategory', () =>
    {
        it('should call fetchFactForCategory', () =>
        {
            component.getFactForCategory();
            expect(service.events.fetchFactForCategory(category).emit).toHaveBeenCalled();
        });
    });

    describe('categorySelected', () =>
    {
        it('should call setSelectedCategory', () =>
        {
            component.categorySelected(category);
            expect(service.events.setSelectedCategory(category).emit).toHaveBeenCalled();
        });
    });

});
