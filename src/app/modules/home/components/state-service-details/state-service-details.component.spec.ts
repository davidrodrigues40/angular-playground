import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateServiceDetailsComponent } from './state-service-details.component';

describe('StateServiceDetailsComponent', () => {
  let component: StateServiceDetailsComponent;
  let fixture: ComponentFixture<StateServiceDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StateServiceDetailsComponent]
    });
    fixture = TestBed.createComponent(StateServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
