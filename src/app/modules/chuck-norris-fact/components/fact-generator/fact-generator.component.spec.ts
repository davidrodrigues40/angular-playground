import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ChuckNorrisStateService } from 'src/app/state/chuck-norris/service/chuck-norris-state.service';
import { FactCategoriesComponent } from '../fact-categories/fact-categories.component';
import { FactGeneratorComponent } from './fact-generator.component';

describe('FactGeneratorComponent', () => {
  let component: FactGeneratorComponent;
  let fixture: ComponentFixture<FactGeneratorComponent>;
  let service: jasmine.SpyObj<ChuckNorrisStateService> = jasmine.createSpyObj('ChuckNorrisFactStateService',
    ['fetchFact$', 'fetchFactForCategory$', 'fetchCategories$', 'setSelectedCategory$'],
    ['fact$', 'categories$', 'selectedCategory$']);

  beforeEach(async () => {
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
