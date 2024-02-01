import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFlowCanvasComponent } from './data-flow-canvas.component';

describe('DataFlowCanvasComponent', () => {
  let component: DataFlowCanvasComponent;
  let fixture: ComponentFixture<DataFlowCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataFlowCanvasComponent]
    });
    fixture = TestBed.createComponent(DataFlowCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
