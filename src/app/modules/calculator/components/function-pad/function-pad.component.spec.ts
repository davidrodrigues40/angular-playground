import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionPad } from './function-pad.component';

describe('FunctionPadComponent', () => {
  let component: FunctionPad;
  let fixture: ComponentFixture<FunctionPad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunctionPad]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FunctionPad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
