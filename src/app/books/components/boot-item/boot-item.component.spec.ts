import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootItemComponent } from './boot-item.component';

describe('BootItemComponent', () => {
  let component: BootItemComponent;
  let fixture: ComponentFixture<BootItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
