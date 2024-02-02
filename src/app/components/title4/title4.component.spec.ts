import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Title4Component } from './title4.component';

describe('Title4Component', () => {
  let component: Title4Component;
  let fixture: ComponentFixture<Title4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Title4Component]
    });
    fixture = TestBed.createComponent(Title4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
