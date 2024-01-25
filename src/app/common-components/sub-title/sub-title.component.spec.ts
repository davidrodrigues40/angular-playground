import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTitleComponent } from './sub-title.component';

describe('SubTitleComponent', () => {
  let component: SubTitleComponent;
  let fixture: ComponentFixture<SubTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubTitleComponent]
    });
    fixture = TestBed.createComponent(SubTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
