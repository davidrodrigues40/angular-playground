import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuckNorrisFooterComponent } from './chuck-norris-footer.component';

describe('ChuckNorrisFooterComponent', () => {
  let component: ChuckNorrisFooterComponent;
  let fixture: ComponentFixture<ChuckNorrisFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChuckNorrisFooterComponent]
    });
    fixture = TestBed.createComponent(ChuckNorrisFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
