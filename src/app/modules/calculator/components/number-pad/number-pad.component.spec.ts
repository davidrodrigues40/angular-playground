import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberPad } from './number-pad.component';

describe('NumberPadComponent', () => {
  let component: NumberPad;
  let fixture: ComponentFixture<NumberPad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberPad]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NumberPad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
