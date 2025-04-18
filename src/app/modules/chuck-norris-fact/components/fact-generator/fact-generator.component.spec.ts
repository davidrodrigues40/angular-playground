import { FactCategory } from 'src/app/interfaces/models/chuck-norris/fact-category';
import { MockComponent } from 'src/app/testing/testing.directive';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { FactCategoriesComponent } from '../fact-categories/fact-categories.component';
import { FactGeneratorComponent } from './fact-generator.component';
import { ChuckNorrisFactsService } from 'src/app/services/chuck-norris/chuck-norris-facts.service';
import { ChuckNorrisFactState } from 'src/app/state/chuck-norris.state';

describe('FactGeneratorComponent', () => {
   let component: FactGeneratorComponent;
   let fixture: ComponentFixture<FactGeneratorComponent>;
   const service: jasmine.SpyObj<ChuckNorrisFactsService> = jasmine.createSpyObj<ChuckNorrisFactsService>(
      'service',
      ['getFact', 'getFactForCategory', 'getCategories', 'getFooterFact']);
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
      service.getFact.calls.reset();
      service.getFactForCategory.calls.reset();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   describe('when getFact invoked', () => {
      it('should call fetchFact', () => {
         component.getFact();

         expect(service.getFact).toHaveBeenCalledTimes(1);
      });
   });

   describe('when getFactForCategory invoked', () => {
      it('should call getFact when category is not set', () => {
         component.selectedCategory.set(null);

         component.getFactForCategory();

         expect(service.getFact).toHaveBeenCalled();
      });

      it('should call call getFactForCategory when category is set', () => {
         const myCategory: FactCategory = { ...category, name: 'test' };
         component.selectedCategory.set(JSON.parse(JSON.stringify(myCategory)));

         component.getFactForCategory();

         expect(service.getFactForCategory).toHaveBeenCalledOnceWith(JSON.parse(JSON.stringify(myCategory)));
      });
   });

   describe('when categorySelected invoked', () => {
      it('should call setSelectedCategory', () => {
         ChuckNorrisFactState.selectedCategory.set = jasmine.createSpy('set');

         component.categorySelected(category);

         expect(ChuckNorrisFactState.selectedCategory.set).toHaveBeenCalledOnceWith(category);
      });
   });
});
