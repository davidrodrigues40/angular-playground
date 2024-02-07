import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxCanvasComponent } from './ngrx-canvas.component';

describe('NgrxCanvasComponent', () => {
  let component: NgrxCanvasComponent;
  let fixture: ComponentFixture<NgrxCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgrxCanvasComponent]
    });
    fixture = TestBed.createComponent(NgrxCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
