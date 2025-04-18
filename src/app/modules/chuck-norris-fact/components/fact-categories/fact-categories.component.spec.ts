import { FactCategory } from 'src/app/interfaces/models/chuck-norris/fact-category';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FactCategoriesComponent } from './fact-categories.component';
import { ChuckNorrisFactsService } from 'src/app/services/chuck-norris/chuck-norris-facts.service';

describe('FactCategoriesComponent', () => {
   let component: FactCategoriesComponent;
   let fixture: ComponentFixture<FactCategoriesComponent>;
   let selectChange: jasmine.SpyObj<MatSelectChange> = jasmine.createSpyObj('MatSelectChange', ['value']);
   const signalService: jasmine.SpyObj<ChuckNorrisFactsService> = jasmine.createSpyObj<ChuckNorrisFactsService>('service', ['getCategories']);

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [FactCategoriesComponent],
         imports: [
            MatFormFieldModule,
            MatSelectModule,
            MatOptionModule,
            BrowserAnimationsModule
         ],
         providers: [
            { provide: ChuckNorrisFactsService, useValue: signalService }
         ]
      })
         .compileComponents();

      fixture = TestBed.createComponent(FactCategoriesComponent);
      component = fixture.componentInstance;
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   describe('ngOnInit', () => {
      it('should call loadCategories', () => {
         component.ngOnInit();

         expect(signalService.getCategories).toHaveBeenCalled();
      });
   });

   describe('selection change', () => {
      it('should emit selectedCategory', () => {
         const category: FactCategory = { name: 'test' };
         spyOn(component.categorySelected, 'emit');
         selectChange.value = category;

         component.selectionChange(selectChange);

         expect(component.categorySelected.emit).toHaveBeenCalledOnceWith(category);
      });
   });
});
