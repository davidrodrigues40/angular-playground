import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsDataFlowCanvasComponent } from './signals-data-flow-canvas.component';

describe('SignalsDataFlowCanvasComponent', () => {
  let component: SignalsDataFlowCanvasComponent;
  let fixture: ComponentFixture<SignalsDataFlowCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignalsDataFlowCanvasComponent]
    });
    fixture = TestBed.createComponent(SignalsDataFlowCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
