import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactGeneratorComponent } from './fact-generator.component';

describe('FactGeneratorComponent', () => {
  let component: FactGeneratorComponent;
  let fixture: ComponentFixture<FactGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
