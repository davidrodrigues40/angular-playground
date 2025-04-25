import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { KeypadFunction, KeypadFunctionType } from '../models/keypad-function';
import { KeypadInput } from '../models/keypad-input';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when keypress event is triggered', () => {
    it('should call numberPressed method', () => {
      const div = document.getElementById('calculator') as HTMLDivElement;
      const event: KeyboardEvent = new KeyboardEvent('keyup', { key: '1' });
      spyOn(component, 'numberPressed').and.callThrough();

      div.dispatchEvent(event);

      fixture.detectChanges();
      expect(component['numberPressed']).toHaveBeenCalledWith(1);
    });

    it('should call proces function', () => {
      const div = document.getElementById('calculator') as HTMLDivElement;
      const event: KeyboardEvent = new KeyboardEvent('keyup', { key: 'Enter' });
      spyOn<any>(component, 'processFunction').and.callThrough();

      div.dispatchEvent(event);

      fixture.detectChanges();
      expect(component['processFunction']).toHaveBeenCalled();
    });

    it('should call clear function', () => {
      const div = document.getElementById('calculator') as HTMLDivElement;
      const event: KeyboardEvent = new KeyboardEvent('keyup', { key: 'Escape' });
      spyOn<any>(component, 'clear').and.callThrough();

      div.dispatchEvent(event);

      fixture.detectChanges();
      expect(component['clear']).toHaveBeenCalled();
    });

    it('should call calculate function', () => {
      const div = document.getElementById('calculator') as HTMLDivElement;
      const event: KeyboardEvent = new KeyboardEvent('keyup', { key: '+' });
      component['previousFunction'] = new KeypadFunction('+', KeypadFunctionType.Add);
      spyOn<any>(component, 'calculate').and.callThrough();

      div.dispatchEvent(event);

      fixture.detectChanges();
      expect(component['calculate']).toHaveBeenCalled();
    });

    it('should set total', () => {
      const div = document.getElementById('calculator') as HTMLDivElement;
      const event: KeyboardEvent = new KeyboardEvent('keyup', { key: '+' });
      component['previousFunction'] = undefined;
      component['pressedNumbers'] = [1];

      div.dispatchEvent(event);

      fixture.detectChanges();
      expect(component.total).toBe(1);
    });

    it('should add number', () => {
      const div = document.getElementById('calculator') as HTMLDivElement;
      const event: KeyboardEvent = new KeyboardEvent('keyup', { key: '1' });
      const functionEvent: KeyboardEvent = new KeyboardEvent('keyup', { key: '+' });
      component['previousFunction'] = new KeypadFunction('+', KeypadFunctionType.Add);
      component.total = 1;

      div.dispatchEvent(event);
      div.dispatchEvent(functionEvent);

      expect(component.total).toBe(2);
    });

    it('should subtract number', () => {
      const div = document.getElementById('calculator') as HTMLDivElement;
      const event: KeyboardEvent = new KeyboardEvent('keyup', { key: '1' });
      const functionEvent: KeyboardEvent = new KeyboardEvent('keyup', { key: '-' });
      component['previousFunction'] = new KeypadFunction('-', KeypadFunctionType.Subtract);
      component.total = 1;

      div.dispatchEvent(event);
      div.dispatchEvent(functionEvent);

      expect(component.total).toBe(0);
    });

    it('should multiply number', () => {
      const div = document.getElementById('calculator') as HTMLDivElement;
      const event: KeyboardEvent = new KeyboardEvent('keyup', { key: '2' });
      const functionEvent: KeyboardEvent = new KeyboardEvent('keyup', { key: '*' });
      component['previousFunction'] = new KeypadFunction('*', KeypadFunctionType.Multiply);
      component.total = 2;

      div.dispatchEvent(event);
      div.dispatchEvent(functionEvent);

      expect(component.total).toBe(4);
    });

    it('should divide number', () => {
      const div = document.getElementById('calculator') as HTMLDivElement;
      const event: KeyboardEvent = new KeyboardEvent('keyup', { key: '2' });
      const functionEvent: KeyboardEvent = new KeyboardEvent('keyup', { key: '/' });
      component['previousFunction'] = new KeypadFunction('/', KeypadFunctionType.Divide);
      component.total = 2;

      div.dispatchEvent(event);
      div.dispatchEvent(functionEvent);

      expect(component.total).toBe(1);
    });

    it('should call clear function', () => {
      const div = document.getElementById('calculator') as HTMLDivElement;
      const event: KeyboardEvent = new KeyboardEvent('keyup', { key: 'Escape' });
      spyOn<any>(component, 'clear').and.callThrough();
      component['pressedNumbers'] = [1, 2, 3];
      component['previousFunction'] = new KeypadFunction('C', KeypadFunctionType.Clear);

      div.dispatchEvent(event);

      fixture.detectChanges();
      expect(component['clear']).toHaveBeenCalled();
    });

    it('should call clear function', () => {
      const div = document.getElementById('calculator') as HTMLDivElement;
      const event: KeyboardEvent = new KeyboardEvent('keyup', { key: 'C' });
      spyOn<any>(component, 'clear').and.callThrough();
      component['pressedNumbers'] = [1, 2, 3];
      component['previousFunction'] = new KeypadFunction('C', KeypadFunctionType.Clear);

      div.dispatchEvent(event);

      fixture.detectChanges();
      expect(component['clear']).toHaveBeenCalled();
    });

    it('should call equals function', () => {
      const div = document.getElementById('calculator') as HTMLDivElement;
      const event: KeyboardEvent = new KeyboardEvent('keyup', { key: '1' });
      const secondEvent: KeyboardEvent = new KeyboardEvent('keyup', { key: '+' });
      const third: KeyboardEvent = new KeyboardEvent('keyup', { key: '2' });
      const fourthEvent: KeyboardEvent = new KeyboardEvent('keyup', { key: '=' });
      spyOn<any>(component, 'calculate').and.callThrough();
      component.total = 0;
      component['pressedNumbers'] = [];
      component['previousFunction'] = undefined;

      div.dispatchEvent(event);
      div.dispatchEvent(secondEvent);
      div.dispatchEvent(third);
      div.dispatchEvent(fourthEvent);

      fixture.detectChanges();
      expect(component['calculate']).toHaveBeenCalled();
      expect(component.total).toBe(3);
    });

    it('should throw error when key is not valid', () => {
      const div = document.getElementById('calculator') as HTMLDivElement;
      const event: KeyboardEvent = new KeyboardEvent('keyup', { key: 'a' });
      spyOn<any>(component, 'processFunction').and.callThrough();

      div.dispatchEvent(event);

      fixture.detectChanges();
      expect(component['processFunction']).not.toHaveBeenCalled();
    });
  });

  describe('when function key is pressed', () => {
    it('should call functionPressed method', () => {
      const keypadFunction: KeypadFunction = new KeypadFunction('+', KeypadFunctionType.Add);
      const keypadInput: KeypadInput = new KeypadInput('C', keypadFunction);
      spyOn<any>(component, 'processFunction').and.callThrough();

      component.functionPressed(keypadInput);

      expect(component['processFunction']).toHaveBeenCalledWith(keypadFunction);
    });
  });
});
