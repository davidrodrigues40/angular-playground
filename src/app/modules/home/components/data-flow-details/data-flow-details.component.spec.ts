import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFlowDetailsComponent } from './data-flow-details.component';

describe('DataFlowDetailsComponent', () => {
  let component: DataFlowDetailsComponent;
  let fixture: ComponentFixture<DataFlowDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataFlowDetailsComponent]
    });
    fixture = TestBed.createComponent(DataFlowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
