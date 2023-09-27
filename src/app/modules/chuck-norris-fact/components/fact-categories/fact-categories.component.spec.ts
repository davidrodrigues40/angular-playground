import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactCategoriesComponent } from './fact-categories.component';

describe('FactCategoriesComponent', () => {
  let component: FactCategoriesComponent;
  let fixture: ComponentFixture<FactCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
