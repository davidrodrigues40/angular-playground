import { FactCategory } from 'src/app/modules/chuck-norris-fact/models/fact-category';
import { MockComponent } from 'src/app/testing/testing.directive';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { FactGeneratorComponent } from './fact-generator.component';
import { ChuckNorrisFactsService } from 'src/app/modules/chuck-norris-fact/services/chuck-norris-facts.service';
import { ChuckNorrisFactState } from 'src/app/modules/chuck-norris-fact/chuck-norris.state';
import { FactCategoriesComponent } from './components/fact-categories/fact-categories.component';

describe('FactGeneratorComponent', () => {
   let component: FactGeneratorComponent;
   let fixture: ComponentFixture<FactGeneratorComponent>;
   let selectedCategorySpy: jasmine.Spy;
   const service: jasmine.SpyObj<ChuckNorrisFactsService> = jasmine.createSpyObj<ChuckNorrisFactsService>(
      'service',
      ['getFact', 'getFactForCategory', 'getCategories', 'getFooterFact', 'getFavoriteFact', 'getFavoriteFacts'],);
   const category: FactCategory = {
      name: ''
   };

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [
            FactGeneratorComponent,
            FactCategoriesComponent
         ],
         imports: [
            MatFormFieldModule,
            MatSelectModule,
            MockComponent({ selector: 'app-title2', standalone: true }),
            MockComponent({ selector: 'app-fact', standalone: true })
         ],
         providers: [
            { provide: ChuckNorrisFactsService, useValue: service }
         ]
      })
         .compileComponents();

      fixture = TestBed.createComponent(FactGeneratorComponent);
      component = fixture.componentInstance;
      selectedCategorySpy = spyOn<any>(component, 'selectedCategory');

      service.getFact.calls.reset();
      service.getFactForCategory.calls.reset();
      service.getFavoriteFact.calls.reset();
      service.getFavoriteFacts.calls.reset();
      service.getFooterFact.calls.reset();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });



   describe('when categorySelected invoked', () => {
      it('should call setSelectedCategory', () => {
         ChuckNorrisFactState.selectedCategory.set = jasmine.createSpy('set');

         component.categorySelected(category);

         expect(ChuckNorrisFactState.selectedCategory.set).toHaveBeenCalledOnceWith(category);
      });
   });


});
