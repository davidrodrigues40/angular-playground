import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlerComponent } from './bowler.component';

describe('BowlerComponent', () => {
  let component: BowlerComponent;
  let fixture: ComponentFixture<BowlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BowlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BowlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
