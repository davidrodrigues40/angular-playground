import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FactCategory } from 'src/app/state/chuck-norris/models/fact-category';
import { FactCategoriesComponent } from './fact-categories.component';

describe('FactCategoriesComponent', () => {
  let component: FactCategoriesComponent;
  let fixture: ComponentFixture<FactCategoriesComponent>;
  let selectChange: jasmine.SpyObj<MatSelectChange> = jasmine.createSpyObj('MatSelectChange', ['value']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FactCategoriesComponent],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FactCategoriesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
