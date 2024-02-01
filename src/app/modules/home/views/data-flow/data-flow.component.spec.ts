import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFlowComponent } from './data-flow.component';

describe('DataFlowComponent', () => {
  let component: DataFlowComponent;
  let fixture: ComponentFixture<DataFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataFlowComponent]
    });
    fixture = TestBed.createComponent(DataFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
