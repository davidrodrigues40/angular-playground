import { FactCategory } from 'src/app/interfaces/models/chuck-norris/fact-category';
import { ChuckNorrisSignalService } from 'src/app/state/chuck-norris/service/chuck-norris-signal.service';
import { MockComponent } from 'src/app/testing/testing.directive';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { FactCategoriesComponent } from '../fact-categories/fact-categories.component';
import { FactGeneratorComponent } from './fact-generator.component';

describe('FactGeneratorComponent', () =>
{
   let component: FactGeneratorComponent;
   let fixture: ComponentFixture<FactGeneratorComponent>;
   const signalService: jasmine.SpyObj<ChuckNorrisSignalService> = jasmine.createSpyObj<ChuckNorrisSignalService>(
      'service',
      ['fetchFact', 'fetchFactForCategory', 'setSelectedCategory']);
   const category: FactCategory = {
      name: ''
   };

   beforeEach(async () =>
   {
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
            { provide: ChuckNorrisSignalService, useValue: signalService }
         ]
      })
         .compileComponents();

      fixture = TestBed.createComponent(FactGeneratorComponent);
      component = fixture.componentInstance;
      signalService.fetchFact.calls.reset();
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });

   describe('when getFact invoked', () =>
   {
      it('should call fetchFact', () =>
      {
         component.getFact();

         expect(signalService.fetchFact).toHaveBeenCalledTimes(1);
      });
   });

   describe('when getFactForCategory invoked', () =>
   {
      it('should call fetchFactForCategory', () =>
      {
         const myCategory: FactCategory = { ...category, name: 'test' };
         component.selectedCategory.set(myCategory);

         component.getFactForCategory();

         expect(signalService.fetchFactForCategory).toHaveBeenCalledOnceWith(myCategory)
      });

      it('should call getFact', () =>
      {
         component.selectedCategory.set(null);

         component.getFactForCategory();

         expect(signalService.fetchFact).toHaveBeenCalledTimes(1);
      });
   });

   describe('when categorySelected invoked', () =>
   {
      it('should call setSelectedCategory', () =>
      {
         component.categorySelected(category);

         expect(signalService.setSelectedCategory).toHaveBeenCalledOnceWith(category);
      });
   });
});
