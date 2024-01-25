import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxViewComponent } from './ngrx-view.component';

describe('NgrxViewComponent', () => {
  let component: NgrxViewComponent;
  let fixture: ComponentFixture<NgrxViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgrxViewComponent]
    });
    fixture = TestBed.createComponent(NgrxViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
