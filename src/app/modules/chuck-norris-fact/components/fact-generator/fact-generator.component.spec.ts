import { FactCategory } from 'src/app/interfaces/models/chuck-norris/fact-category';
import { ChuckNorrisSignalService } from 'src/app/state/chuck-norris/service/chuck-norris-signal.service';
import { MockComponent } from 'src/app/testing/testing.directive';
import { TestingSpys } from 'src/app/testing/testing.spys';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { FactCategoriesComponent } from '../fact-categories/fact-categories.component';
import { FactGeneratorComponent } from './fact-generator.component';

describe('FactGeneratorComponent', () =>
{
   let component: FactGeneratorComponent;
   let fixture: ComponentFixture<FactGeneratorComponent>;
   const signalService: jasmine.SpyObj<ChuckNorrisSignalService> = TestingSpys.signalService<ChuckNorrisSignalService>(
      ['bindFact', 'bindSelectedCategory'], ['fetchFact', 'fetchFactForCategory', 'setSelectedCategory']);
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
      (signalService.methods.fetchFact as jasmine.Spy).calls.reset();
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });

   describe('when ngOnInit invoked', () =>
   {
      it('should call bindData', () =>
      {
         component.ngOnInit();

         expect(signalService.effects.bindFact).toHaveBeenCalledOnceWith(component.fact);
         expect(signalService.effects.bindSelectedCategory).toHaveBeenCalledOnceWith(component.selectedCategory);
      });
   });

   describe('when getFact invoked', () =>
   {
      it('should call fetchFact', () =>
      {
         component.getFact();

         expect(signalService.methods.fetchFact).toHaveBeenCalledTimes(1);
      });
   });

   describe('when getFactForCategory invoked', () =>
   {
      it('should call fetchFactForCategory', () =>
      {
         const myCategory: FactCategory = { ...category, name: 'test' };
         component.selectedCategory.value = myCategory;

         component.getFactForCategory();

         expect(signalService.methods.fetchFactForCategory).toHaveBeenCalledOnceWith(myCategory)
      });

      it('should call getFact', () =>
      {
         component.selectedCategory.value = null;

         component.getFactForCategory();

         expect(signalService.methods.fetchFact).toHaveBeenCalledTimes(1);
      });
   });

   describe('when categorySelected invoked', () =>
   {
      it('should call setSelectedCategory', () =>
      {
         component.categorySelected(category);

         expect(signalService.methods.setSelectedCategory).toHaveBeenCalledOnceWith(category);
      });
   });
});
