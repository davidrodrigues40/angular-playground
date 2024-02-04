import { ChuckNorrisFact } from 'src/app/state/chuck-norris/models/chuck-norris-fact';
import { FactCategory } from 'src/app/state/chuck-norris/models/fact-category';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { FactCategoriesComponent } from '../fact-categories/fact-categories.component';
import { FactGeneratorComponent } from './fact-generator.component';

describe('FactGeneratorComponent', () =>
{
   let component: FactGeneratorComponent;
   let fixture: ComponentFixture<FactGeneratorComponent>;
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
         imports: [
            MatFormFieldModule,
            MatSelectModule
         ]
      })
         .compileComponents();

      fixture = TestBed.createComponent(FactGeneratorComponent);
      component = fixture.componentInstance;
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });

});
