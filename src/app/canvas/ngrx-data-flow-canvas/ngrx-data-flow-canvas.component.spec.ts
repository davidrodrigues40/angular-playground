import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxDataFlowCanvasComponent } from './ngrx-data-flow-canvas.component';

describe('NgrxDataFlowCanvasComponent', () => {
  let component: NgrxDataFlowCanvasComponent;
  let fixture: ComponentFixture<NgrxDataFlowCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgrxDataFlowCanvasComponent]
    });
    fixture = TestBed.createComponent(NgrxDataFlowCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
