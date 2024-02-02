import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateDialogComponent } from './state-dialog.component';

describe('StateDialogComponent', () => {
  let component: StateDialogComponent;
  let fixture: ComponentFixture<StateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StateDialogComponent]
    });
    fixture = TestBed.createComponent(StateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
