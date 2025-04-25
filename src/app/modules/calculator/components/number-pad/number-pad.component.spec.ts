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

  describe('when keypadButtonPressed is called', () => {
    it('should emit the value of the key pressed', () => {
      const key = { display: '1', value: 1 };
      spyOn(component.keyPressed, 'emit');
      component.keypadButtonPressed(key);
      expect(component.keyPressed.emit).toHaveBeenCalledWith(1);
    });

    it('should not emit if the key value is undefined', () => {
      const key = { display: '', value: undefined };
      spyOn(component.keyPressed, 'emit');
      component.keypadButtonPressed(key);
      expect(component.keyPressed.emit).not.toHaveBeenCalled();
    });
  });
});
