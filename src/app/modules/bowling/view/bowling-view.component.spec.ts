import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlingViewComponent } from './bowling-view.component';

describe('BowlComponent', () => {
  let component: BowlingViewComponent;
  let fixture: ComponentFixture<BowlingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BowlingViewComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BowlingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
