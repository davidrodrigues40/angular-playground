import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxDetailsComponent } from './ngrx-details.component';

describe('NgrxDetailsComponent', () => {
  let component: NgrxDetailsComponent;
  let fixture: ComponentFixture<NgrxDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgrxDetailsComponent]
    });
    fixture = TestBed.createComponent(NgrxDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
