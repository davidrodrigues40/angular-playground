import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxDataFlowComponent } from './ngrx-data-flow.component';

describe('NgrxDataFlowComponent', () => {
  let component: NgrxDataFlowComponent;
  let fixture: ComponentFixture<NgrxDataFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgrxDataFlowComponent]
    });
    fixture = TestBed.createComponent(NgrxDataFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
